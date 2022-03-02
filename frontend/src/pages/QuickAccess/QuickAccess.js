import { useCallback, useEffect } from "react";

import { StringParam, useQueryParam, withDefault } from "use-query-params";

import MangaListingLayout from "../MangaListingLayout";
import { MangaTabs } from "../../components";
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
import "./QuickAccess.less";

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

const DAILY_UPDATE_FILTERS = {
  shelf: [READING, WAITING, TO_READ, REREAD],
  isCompleted: false,
};

const QuickAccess = () => {
  const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "reading"));
  const loadMangas = useCallback(() => MangaAPI.find(TAB_MAPPING[tab].filters), [tab]);

  const tabs = <MangaTabs key="tabs" tab={tab} setTab={setTab} tabMappings={TAB_MAPPING} />;

  useEffect(() => {
    document.title = `Quick access - ${TAB_MAPPING[tab].displayName} | MangaBookmark`;
  }, [tab]);

  return (
    <MangaListingLayout
      title="Quick access"
      mangasOrFactory={loadMangas}
      loadMode="replace"
      filterNode={tabs}
      updateMangaFilters={DAILY_UPDATE_FILTERS}
      updateButtonText="Daily update"
    />
  );
};

export default QuickAccess;
