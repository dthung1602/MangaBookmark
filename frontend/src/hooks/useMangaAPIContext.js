import { useState, useEffect, useCallback } from "react";

import { message } from "antd";

import { MangaAPI } from "../api";
import { notifyError, throwOnCriticalErrors } from "../utils/error-handler";
import { getNextChapToRead, markChapterLogic } from "../utils/chapters";
import { shouldDisableMarkAll } from "../utils/manga";
import { REREAD } from "../utils/constants";
import { doNothing } from "../utils";

const defaultCallbacks = {
  editMangaDone: doNothing,
  updateMangaDone: doNothing,
  markChaptersDone: doNothing,
  deleteMangaDone: doNothing,
};

const useMangaAPIContext = (mangaOrFactory = null, callbacks = {}) => {
  // ----------------
  //    manga logic
  // ----------------
  const initMangaValue = mangaOrFactory instanceof Function ? null : mangaOrFactory;
  const initLoadingValue = mangaOrFactory instanceof Function;
  const [manga, setManga] = useState(initMangaValue);
  const [isLoading, setIsLoading] = useState(initLoadingValue);
  const [errors, setErrors] = useState({});

  const { editMangaDone, updateMangaDone, markChaptersDone, deleteMangaDone } = { ...defaultCallbacks, ...callbacks };

  useEffect(() => {
    setErrors({});

    // not a function -> set manga
    if (!(mangaOrFactory instanceof Function)) {
      setManga(mangaOrFactory);
      return;
    }

    const maybeAPICall = mangaOrFactory();

    // not an api call -> set result as manga
    if (maybeAPICall === null || !("result" in maybeAPICall)) {
      setManga(maybeAPICall);
      setIsLoading(false);
      return;
    }

    // perform api call
    setIsLoading(true);
    maybeAPICall.result
      .then(async (response) => {
        // default value when manga is set directly
        let newManga = response;
        let newErrors = {};

        if (response instanceof Response) {
          throwOnCriticalErrors(response);
          newManga = await response.json();

          if (!response.ok) {
            newErrors = newManga.errors;
            newManga = null;
          }
        }

        setManga(newManga);
        setErrors(newErrors);
      })
      .catch((e) => {
        // silently ignore AbortError while report others
        // if a request is aborted => another is being made => loading = true
        if (e.name !== "AbortError") {
          notifyError(e);
        }
      })
      .finally(() => setIsLoading(false));

    return () => maybeAPICall.abort();
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
    isLoading,
    errors,
    setErrors,
    nextChapToRead,
    nextChapToReadIdx,
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

export default useMangaAPIContext;
