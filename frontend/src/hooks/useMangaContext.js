import { useState, useEffect, useCallback } from "react";

import { message } from "antd";

import { MangaAPI } from "../api";
import { notifyError, throwOnCriticalErrors } from "../utils/error-handler";
import { getNextChapToRead, markChapterLogic } from "../utils/chapters";
import { REREAD } from "../utils/constants";
import { doNothing } from "../utils";

const shouldDisableMarkAll = (manga) => {
  if (!manga || manga.shelf === REREAD) {
    return false;
  }
  return manga.chapters.every((ch) => ch.isRead);
};

const defaultCallbacks = {
  editMangaDone: doNothing,
  updateMangaDone: doNothing,
  markChaptersDone: doNothing,
  deleteMangaDone: doNothing,
};

const useMangaContext = (mangaOrFactory = null, callbacks = {}) => {
  // ----------------
  //    manga logic
  // ----------------
  const initMangaValue = mangaOrFactory instanceof Function ? null : mangaOrFactory;
  const initLoadingValue = mangaOrFactory instanceof Function;
  const [manga, setManga] = useState(initMangaValue);
  const [isLoading, setIsLoading] = useState(initLoadingValue);

  const { editMangaDone, updateMangaDone, markChaptersDone, deleteMangaDone } = { ...defaultCallbacks, ...callbacks };

  useEffect(() => {
    if (!(mangaOrFactory instanceof Function)) {
      setManga(mangaOrFactory);
      return;
    }

    setIsLoading(true);
    const { result, abort } = mangaOrFactory();

    result
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
      })
      .finally(() => setIsLoading(false));

    return () => abort();
  }, [mangaOrFactory]);

  const editMangaField = useCallback(
    (field) => (value) => {
      setIsLoading(true);
      return MangaAPI.patch({ [field]: value }, manga._id)
        .result.then(async (response) => {
          throwOnCriticalErrors(response);
          const newManga = await response.json();
          message.success("Manga updated");
          setManga(newManga);
          editMangaDone(newManga);
        })
        .catch(notifyError)
        .finally(() => setIsLoading(false));
    },
    [setIsLoading, manga, editMangaDone],
  );

  const updateManga = useCallback(() => {
    setIsLoading(true);
    MangaAPI.update(manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const newManga = await response.json();
        message.success("Manga updated");
        setManga(newManga);
        updateMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  }, [setIsLoading, manga, updateMangaDone]);

  const deleteManga = useCallback(() => {
    setIsLoading(true);
    MangaAPI.delete(manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        message.success("Manga deleted");
        setManga(null);
        deleteMangaDone(manga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  }, [setIsLoading, manga]);

  // -----------------
  //   chapter logic
  // -----------------
  const [isMarkingChapters, setIsMarkingChapters] = useState(false);
  const [nextChapToRead, nextChapToReadIdx] = getNextChapToRead(manga);
  const disableMarkAll = shouldDisableMarkAll(manga);

  const markChapters = (manga, isRead, chapLinks) => {
    if (chapLinks.length === 0) {
      return;
    }
    setIsMarkingChapters(true);

    let apiCall;
    if (manga.shelf === REREAD) {
      apiCall = MangaAPI.updateRereadProgress(manga._id, chapLinks[0]);
    } else {
      apiCall = MangaAPI.markChapters(manga._id, isRead, chapLinks);
    }

    apiCall.result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        const newManga = await response.json();
        setManga(newManga);
        markChaptersDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsMarkingChapters(false));
  };

  const [markOne, markUpTo, markAll] = markChapterLogic(manga, markChapters);

  return {
    manga,
    setManga,
    nextChapToRead,
    nextChapToReadIdx,
    isLoading,
    editMangaField,
    updateManga,
    deleteManga,
    isMarkingChapters,
    markOne,
    markUpTo,
    markAll,
    disableMarkAll,
  };
};

export default useMangaContext;
