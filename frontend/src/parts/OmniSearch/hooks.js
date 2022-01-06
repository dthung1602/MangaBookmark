import { useRef, useState } from "react";
import { debounce } from "lodash";
import { OmniSearchAPI } from "../../api";
import { notifyError, throwOnCriticalErrors } from "../../utils/error-handler";
import { doNothing } from "../../utils";

const useSearch = (setSearchResultVisible) => {
  const [userMangas, setUserMangas] = useState([]);
  const [isLoadingUserMangas, setIsLoadingUserMangas] = useState(false);

  const [scanlationMangas, setScanlationMangas] = useState([]);
  const [isLoadingScanlationMangas, setIsLoadingScanlationMangas] = useState(false);

  const abortLastSearchRef = useRef(doNothing);

  const search = debounce((term) => {
    abortLastSearchRef.current();

    setSearchResultVisible(true);

    setIsLoadingUserMangas(true);
    setUserMangas([]);
    setIsLoadingScanlationMangas(true);
    setScanlationMangas([]);

    const userMangaAPICall = OmniSearchAPI.searchUserManga(term);
    const scanlationMangaAPICall = OmniSearchAPI.searchScanlationSites(term);

    userMangaAPICall.result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        setUserMangas(await response.json());
      })
      .catch(notifyError)
      .finally(() => setIsLoadingUserMangas(false));

    scanlationMangaAPICall.result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        setScanlationMangas(await response.json());
      })
      .catch(notifyError)
      .finally(() => setIsLoadingScanlationMangas(false));

    abortLastSearchRef.current = () => {
      userMangaAPICall.abort();
      scanlationMangaAPICall.abort();
    };
  }, 300);

  const hasData = userMangas.length + scanlationMangas.length > 0;

  return {
    search,
    userMangas,
    isLoadingUserMangas,
    scanlationMangas,
    isLoadingScanlationMangas,
    hasData,
  };
};

export { useSearch };
