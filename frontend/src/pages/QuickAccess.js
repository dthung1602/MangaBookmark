import { useEffect, useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Layout, Modal, Tabs, Affix, Switch } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { Desktop, Mobile } from "../components/ScreenSize";
import PageLayout from "./PageLayout";
import FAB from "../components/FAB";
import PageHeader from "../components/PageHeader";
import RightPanel from "../components/RightPanel";
import MangaTableDesktop from "../components/MangaTable/MangaTableDesktop";
import MangaTableMobile from "../components/MangaTable/MangaTableMobile";
import NewMangaModal from "../components/NewMangaModal";
import {
  READING,
  TO_READ,
  TOP_TO_READ_MG_COUNT,
  TOP_WAITING_MG_COUNT,
  WAITING,
  WAITING_MG_UNREAD_CHAP_THRESHOLD,
} from "../utils/constants";
import { MangaAPI } from "../api";
import { useUpdateMultipleAPI, useEnrichMangas, useEnrichManga } from "../hooks";
import { throwOnCriticalErrors, notifyError } from "../utils/error-handler";
import "./Mangas.less";

const { TabPane } = Tabs;

const TAB_MAPPING = {
  reading: {
    displayName: "Reading",
    description: "Mangas in Reading shelf that has unread chapters",
    filters: {
      shelf: READING,
      unreadChapCountGTE: 1,
      sort: "-unreadChapCount",
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
  shelf: [READING, WAITING, TO_READ],
  isCompleted: false,
};

const QuickAccess = () => {
  const [mangas, setMangas] = useEnrichMangas();
  const [showHidden, setShowHidden] = useState(false);
  const [selectedManga, setSelectedManga] = useEnrichManga();
  const [isLoading, setIsLoading] = useState(true);
  const [mangaCount, setMangaCount] = useState(NaN);
  const [openImg, setOpenImg] = useState(false);
  const [newMangaModalOpen, setNewMangaModalOpen] = useState(false);

  const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "reading"));

  useEffect(() => {
    setIsLoading("reload");
    const filters = { ...TAB_MAPPING[tab].filters };
    const { abort, result } = MangaAPI.find(filters);
    result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        const { data, totalItem } = await response.json();
        setMangaCount(totalItem);
        setMangas(data);
        setIsLoading(false);
      })
      .catch((e) => {
        // silently ignore AbortError while report others
        // if a request is aborted => another is being made => loading = true
        if (e.name !== "AbortError") {
          notifyError(e);
        }
      })
      .finally(() => setIsLoading(false));

    return abort;
  }, [tab]);

  useEffect(() => setSelectedManga(null), [tab]);

  const [isUpdatingMangas, updateMangas] = useUpdateMultipleAPI(DAILY_UPDATE_FILTERS);

  const addMangaDone = (newManga) => {
    if (newManga.shelf === TAB_MAPPING[tab].filters.shelf) {
      setMangas([newManga, ...mangas]);
      setMangaCount(mangaCount + 1);
    }
  };

  const updateMangaDone = (newManga) => {
    setSelectedManga(newManga);
    setMangas((prevState) => {
      const idx = prevState.findIndex((mg) => mg._id === newManga._id);
      prevState[idx] = newManga;
      return [...prevState];
    });
  };

  const deleteMangaDone = (mangaId) => {
    setSelectedManga(null);
    setMangas((prevState) => prevState.filter((mg) => mg._id !== mangaId));
  };

  const openNewMangaModal = () => setNewMangaModalOpen(true);
  const closeNewMangaModal = () => setNewMangaModalOpen(false);

  const displayMangas = mangas.filter((mg) => showHidden || !mg.hidden);

  const pageHeader = (
    <PageHeader
      title="Quick access"
      updateBtnText="Daily update"
      mangaCount={isLoading ? "?" : mangaCount}
      openNewMangaModal={openNewMangaModal}
      isUpdatingMangas={isUpdatingMangas}
      updateMangas={updateMangas}
    />
  );

  const tabs = (
    <Affix className="affix-container">
      <Tabs
        defaultActiveKey={tab}
        onChange={setTab}
        className="tab"
        tabBarExtraContent={
          <Switch
            size="small"
            title={showHidden ? "Hide hidden mangas" : "Show hidden mangas"}
            checked={showHidden}
            onChange={(v) => setShowHidden(v)}
            checkedChildren={<EyeOutlined />}
            unCheckedChildren={<EyeInvisibleOutlined />}
          />
        }
      >
        {Object.entries(TAB_MAPPING).map(([tab, { displayName, description }]) => (
          <TabPane key={tab} tab={<span title={description}>{displayName}</span>} />
        ))}
      </Tabs>
    </Affix>
  );

  return (
    <PageLayout>
      <Layout>
        <Desktop
          render={() => (
            <>
              <div className="left-panel">
                {pageHeader}
                {tabs}
                <MangaTableDesktop
                  mangas={displayMangas}
                  isLoading={isLoading}
                  updateMangaDone={updateMangaDone}
                  onMangaClicked={(manga) => setSelectedManga(manga)}
                  showImage={setOpenImg}
                />
              </div>
              <RightPanel
                key={selectedManga?._id}
                manga={selectedManga}
                showImage={setOpenImg}
                deleteMangaDone={deleteMangaDone}
                updateMangaDone={updateMangaDone}
              />
            </>
          )}
        />

        <Mobile
          render={() => (
            <>
              {pageHeader}
              {tabs}
              <MangaTableMobile
                mangas={displayMangas}
                isLoading={isLoading}
                deleteMangaDone={deleteMangaDone}
                updateMangaDone={updateMangaDone}
              />
            </>
          )}
        />
      </Layout>

      <FAB openNewMangaModal={openNewMangaModal} isUpdatingMangas={isUpdatingMangas} updateMangas={updateMangas} />

      <NewMangaModal open={newMangaModalOpen} onCancel={closeNewMangaModal} addMangaDone={addMangaDone} />

      <Modal visible={openImg} footer={null} onCancel={() => setOpenImg(false)}>
        <img className="right-panel-cover-large" src={openImg} alt={openImg} />
      </Modal>
    </PageLayout>
  );
};

export default QuickAccess;
