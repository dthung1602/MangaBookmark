import { useState, useEffect } from "react";

import { useMarkChapterAPI } from "../hooks";
import { notifyError, throwOnCriticalErrors } from "../utils/error-handler";
import { MangaAPI } from "../api";
import { message } from "antd";
import { getNextChapToRead, markChapterLogic } from "../utils/chapters";

const doNothing = () => {};

const useMangaContext = (
  loadManga,
  editMangaDone = doNothing,
  updateMangaDone = doNothing,
  markChapterDone = doNothing,
  deleteMangaDone = doNothing,
) => {
  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isMarkingChapters, markChapters] = useMarkChapterAPI(markChapterDone);
  const [markOne, markUpTo, markAll] = markChapterLogic(manga, markChapters);
  const nextChapToRead = getNextChapToRead(manga);

  useEffect(() => {
    setIsLoading(true);
    const loaded = loadManga();

    // handle a setting manga directly
    if (!(loaded?.result instanceof Promise)) {
      setManga(loaded);
      setIsLoading(false);
      return;
    }

    // handle api result
    loaded.result
      .then(async (response) => {
        let newManga = response;
        if (response instanceof Response) {
          throwOnCriticalErrors(response);
          newManga = await response.json();
        }
        setManga(newManga);
        setIsLoading(false);
      })
      .catch((e) => {
        // silently ignore AbortError while report others
        // if a request is aborted => another is being made => loading = true
        if (e.name !== "AbortError") {
          notifyError(e);
        }
      });

    return () => loaded.abort();
  }, [loadManga]);

  const editMangaField = (field) => (value) => {
    setIsLoading(true);
    return MangaAPI.patch({ [field]: value }, manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const newManga = await response.json();
        message.success("Manga updated");
        editMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const updateManga = () => {
    setIsLoading(true);
    MangaAPI.update(manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const newManga = await response.json();
        message.success("Manga updated");
        updateMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const deleteManga = () => {
    setIsLoading(true);
    MangaAPI.delete(manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        message.success("Manga deleted");
        deleteMangaDone(manga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  return {
    manga,
    setManga,
    nextChapToRead,
    isLoading,
    editMangaField,
    updateManga,
    deleteManga,
    isMarkingChapters,
    markOne,
    markUpTo,
    markAll,
  };
};

export default useMangaContext;
