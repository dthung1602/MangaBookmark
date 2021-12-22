import { useEffect, useCallback, useState, useMemo } from "react";
import { notifyError, throwOnCriticalErrors } from "../utils/error-handler";
import { doNothing } from "../utils";

const useMangaListContext = (
  mangasOrFactory,
  addMangaDone = doNothing,
  editMangaDone = doNothing,
  updateMangaDone = doNothing,
  deleteMangaDone = doNothing,
  onMangaClicked = doNothing,
) => {
  const [totalFound, setTotalFound] = useState(NaN);
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHidden, setShowHidden] = useState(false);

  useEffect(() => {
    if (!(mangasOrFactory instanceof Function)) {
      return;
    }

    setIsLoading(true);
    const { result, abort } = mangasOrFactory();

    result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        const { data, totalItem } = await response.json();
        setMangas(data);
        setTotalFound(totalItem);
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
    totalFound,
    showHidden,
    setShowHidden,
    mangasToShow,
    onMangaClicked: wrappedOnMangaClicked,
    addMangaDone: wrappedAddMangaDone,
    editMangaDone: wrappedEditMangaDone,
    updateMangaDone: wrappedUpdateMangaDone,
    deleteMangaDone: wrappedDeleteMangaDone,
  };
};

export default useMangaListContext;
