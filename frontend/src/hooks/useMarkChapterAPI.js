import { MangaAPI } from "../api";
import { checkResponse, notifyError } from "../utils/error-handler";

const useMarkChapterAPI = (updateMangaDone) => {
  return (mangaId, isRead, chapLinks) => {
    return MangaAPI.markChapters(mangaId, isRead, chapLinks)
      .then(async (response) => {
        checkResponse(response);
        const newManga = await response.json();
        updateMangaDone(newManga);
      })
      .catch(notifyError);
  };
};

export default useMarkChapterAPI;
