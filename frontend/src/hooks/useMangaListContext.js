import { useEffect, useCallback, useState, useMemo } from "react";
import { notifyError, throwOnCriticalErrors } from "../utils/error-handler";
import { doNothing } from "../utils";

const defaultCallbacks = {
  addMangaDone: doNothing,
  editMangaDone: doNothing,
  updateMangaDone: doNothing,
  markChaptersDone: doNothing,
  deleteMangaDone: doNothing,
  onMangaClicked: doNothing,
};

const useMangaListContext = (mangasOrFactory, loadMode, callbacks = {}) => {
  const [totalFound, setTotalFound] = useState(NaN);
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(mangasOrFactory instanceof Function ? loadMode : false);
  const [showHidden, setShowHidden] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const { addMangaDone, editMangaDone, updateMangaDone, markChaptersDone, deleteMangaDone, onMangaClicked } = {
    ...defaultCallbacks,
    ...callbacks,
  };

  useEffect(() => {
    if (!(mangasOrFactory instanceof Function)) {
      return;
    }

    setIsLoading(loadMode);
    const { result, abort } = mangasOrFactory();

    result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        let { data, totalItem, isLastPage, page } = await response.json();
        setAllLoaded(isLastPage);
        setTotalFound(totalItem);
        if (page > 1) {
          data = mangas.concat(data);
        }
        setMangas(data);
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
  }, [mangasOrFactory]);

  const mangasToShow = useMemo(() => mangas.filter((m) => showHidden || !m.hidden), [showHidden, mangas]);

  const wrappedAddMangaDone = useCallback(
    (newManga) => {
      // TODO condition to add new manga to list?
      setMangas((prevState) => [newManga, ...prevState]);
      addMangaDone(newManga);
    },
    [addMangaDone],
  );

  const wrappedEditMangaDone = useCallback(
    (newManga) => {
      setMangas((prevState) => {
        const idx = prevState.findIndex((mg) => mg._id === newManga._id);
        prevState[idx] = newManga;
        return [...prevState];
      });
      editMangaDone(newManga);
    },
    [editMangaDone],
  );

  const wrappedUpdateMangaDone = useCallback(
    (newManga) => {
      setMangas((prevState) => {
        const idx = prevState.findIndex((mg) => mg._id === newManga._id);
        prevState[idx] = newManga;
        return [...prevState];
      });
      updateMangaDone(newManga);
    },
    [updateMangaDone],
  );

  const wrappedMarkChaptersDone = useCallback(
    (newManga) => {
      setMangas((prevState) => {
        const idx = prevState.findIndex((mg) => mg._id === newManga._id);
        prevState[idx] = newManga;
        return [...prevState];
      });
      markChaptersDone(newManga);
    },
    [markChaptersDone],
  );

  const wrappedDeleteMangaDone = useCallback(
    (deletedManga) => {
      setMangas((prevState) => prevState.filter((mg) => mg._id !== deletedManga._id));
      deleteMangaDone(deletedManga);
    },
    [deleteMangaDone],
  );

  const wrappedOnMangaClicked = useCallback((...args) => onMangaClicked(...args), [onMangaClicked]);

  // TODO use memo?
  return {
    mangas,
    setMangas,
    isLoading,
    loadMode,
    allLoaded,
    totalFound,
    showHidden,
    setShowHidden,
    mangasToShow,
    onMangaClicked: wrappedOnMangaClicked,
    addMangaDone: wrappedAddMangaDone,
    editMangaDone: wrappedEditMangaDone,
    updateMangaDone: wrappedUpdateMangaDone,
    markChaptersDone: wrappedMarkChaptersDone,
    deleteMangaDone: wrappedDeleteMangaDone,
  };
};

export default useMangaListContext;
