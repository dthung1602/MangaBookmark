import { useState } from "react";

import { MangaAPI } from "../api";
import { checkResponse, notifyError } from "../utils/error-handler";

const useMarkChapterAPI = (updateMangaDone) => {
  const [isLoading, setIsLoading] = useState(false);

  const markChapters = (mangaId, isRead, chapLinks) => {
    if (chapLinks.length === 0) {
      return;
    }
    setIsLoading(true);
    MangaAPI.markChapters(mangaId, isRead, chapLinks)
      .result.then(async (response) => {
        checkResponse(response);
        const newManga = await response.json();
        updateMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  return [isLoading, markChapters];
};

export default useMarkChapterAPI;
