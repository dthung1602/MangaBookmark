import { useState } from "react";

import { MangaAPI } from "../api";
import { REREAD } from "../utils/constants";
import { throwOnCriticalErrors, notifyError } from "../utils/error-handler";

const useMarkChapterAPI = (markChaptersDone) => {
  const [isLoading, setIsLoading] = useState(false);

  const markChapters = (manga, isRead, chapLinks) => {
    if (chapLinks.length === 0) {
      return;
    }
    setIsLoading(true);

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
        if (markChaptersDone) {
          markChaptersDone(newManga);
        }
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  return [isLoading, markChapters];
};

export default useMarkChapterAPI;
