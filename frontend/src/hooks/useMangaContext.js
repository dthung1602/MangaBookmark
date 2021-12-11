import { useState, useEffect } from "react";

import { useMarkChapterAPI } from "../hooks";
import { notifyError, throwOnCriticalErrors } from "../utils/error-handler";

const useMangaContext = (loadManga, reloadDependencies = loadManga) => {
  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingChapter, markChapters] = useMarkChapterAPI();

  useEffect(() => {
    setIsLoading(true);
    const { result, abort } = loadManga();

    result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        setManga(await response.json());
        setIsLoading(false);
      })
      .catch((e) => {
        // silently ignore AbortError while report others
        // if a request is aborted => another is being made => loading = true
        if (e.name !== "AbortError") {
          notifyError(e);
        }
      });

    return () => abort();
  }, [reloadDependencies]);

  return { manga, setManga, isLoading, setIsLoading, isMarkingChapter, markChapters };
};

export default useMangaContext;
