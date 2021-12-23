import { useCallback, useEffect } from "react";

import { StringParam, useQueryParam, withDefault } from "use-query-params";

import { useMangaListContext } from "../../hooks";
import {
  READING,
  REREAD,
  TO_READ,
  TOP_TO_READ_MG_COUNT,
  TOP_WAITING_MG_COUNT,
  WAITING,
  WAITING_MG_UNREAD_CHAP_THRESHOLD,
} from "../../utils/constants";
import { MangaAPI } from "../../api";

const TAB_MAPPING = {
  reading: {
    displayName: "Reading",
    description: "Mangas in Reading shelf that has unread chapters",
    filters: {
      shelf: [READING, REREAD],
      unreadChapCountGTE: 1,
      sort: "-status -unreadChapCount",
      page: 1,
      perPage: 0,
    },
  },
  waiting: {
    displayName: "Waiting",
    description: `Top ${TOP_WAITING_MG_COUNT} mangas in Waiting shelf that has more than ${WAITING_MG_UNREAD_CHAP_THRESHOLD} unread chapters`,
    filters: {
      shelf: WAITING,
      unreadChapCountGTE: WAITING_MG_UNREAD_CHAP_THRESHOLD,
      sort: "-unreadChapCount",
      page: 1,
      perPage: TOP_WAITING_MG_COUNT,
    },
  },
  toread: {
    displayName: "Top to read",
    description: `Top ${TOP_TO_READ_MG_COUNT} mangas in To Read shelf that *should* be read first`,
    filters: {
      shelf: TO_READ,
      sort: "-isCompleted createdAt -unreadChapCount",
      page: 1,
      perPage: TOP_TO_READ_MG_COUNT,
    },
  },
};

const useMangaTab = (setSelectedManga) => {
  const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "reading"));

  useEffect(() => setSelectedManga(null), [tab, setSelectedManga]);

  const loadMangas = useCallback(() => MangaAPI.find(TAB_MAPPING[tab].filters), [tab]);
  const setSelectedMangaToNull = useCallback(() => setSelectedManga(null), [setSelectedManga]);

  const mangaListContext = useMangaListContext(
    loadMangas,
    setSelectedManga,
    setSelectedManga,
    setSelectedManga,
    setSelectedManga,
    setSelectedMangaToNull,
    setSelectedManga,
  );
  return { tab, setTab, mangaListContext };
};

export { useMangaTab, TAB_MAPPING };
