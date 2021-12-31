import { useCallback, useEffect, useState } from "react";

import { notifyError, throwOnCriticalErrors } from "../utils/error-handler";
import { getNextChapToRead, markChapterLogic } from "../utils/chapters";
import { shouldDisableMarkAll } from "../utils/manga";
import { clonePlainObject, doNothing } from "../utils";
import { REREAD } from "../utils/constants";

const defaultCallbacks = {
  editMangaDone: doNothing,
  markChaptersDone: doNothing,
};

const useMangaLocalContext = (mangaOrFactory = null, callbacks = {}) => {
  // ----------------
  //    manga logic
  // ----------------
  const initMangaValue = mangaOrFactory instanceof Function ? null : mangaOrFactory;
  const initLoadingValue = mangaOrFactory instanceof Function;
  const [manga, setManga] = useState(initMangaValue);
  const [isLoading, setIsLoading] = useState(initLoadingValue);
  const [errors, setErrors] = useState({});

  const { editMangaDone, markChaptersDone } = { ...defaultCallbacks, ...callbacks };

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
      setManga({ ...clonePlainObject(manga), [field]: value });
      editMangaDone();
    },
    [setIsLoading, manga, editMangaDone],
  );

  const updateManga = doNothing;

  const deleteManga = doNothing;

  // -----------------
  //   chapter logic
  // -----------------
  const isMarkingChapters = false;
  const [nextChapToRead, nextChapToReadIdx] = getNextChapToRead(manga);
  const disableMarkAll = shouldDisableMarkAll(manga);

  const markChapters = (manga, isRead, chapLinks) => {
    if (chapLinks.length === 0) {
      return;
    }

    const cloneManga = clonePlainObject(manga);

    if (cloneManga.shelf === REREAD) {
      cloneManga.nextRereadChapter = null;
      let encounteredNextChapToRead = chapLinks[0] === "";
      cloneManga.chapters.forEach((ch) => {
        ch.isRead = encounteredNextChapToRead;
        if (ch.link === chapLinks[0]) {
          cloneManga.nextRereadChapter = clonePlainObject(ch);
          encounteredNextChapToRead = true;
        }
      });
    } else {
      cloneManga.chapters.forEach((ch) => {
        if (chapLinks.includes(ch.link)) {
          ch.isRead = isRead;
        }
      });
    }

    setManga(cloneManga);
    markChaptersDone();
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

export default useMangaLocalContext;
