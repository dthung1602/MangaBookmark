import { useEffect, useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Affix, Layout, Modal, Switch, Tabs, Tooltip } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { Desktop, Mobile } from "../../components/ScreenSize";
import PageLayout from ".././PageLayout";
import FAB from "../../components/FAB";
import MangaPageHeader from "../../components/MangaPageHeader";
import RightPanel from "../../components/RightPanel";
import MangaTableDesktop from "../../components/MangaTable/MangaTableDesktop";
import MangaTableMobile from "../../components/MangaTable/MangaTableMobile";
import NewMangaModal from "../../components/NewMangaModal";
import UserNote from "../../components/UserNoteModal/UserNoteModal";
import MangaCover from "../../components/MangaCover";
import {
  READING,
  REREAD,
  TO_READ,
  TOP_TO_READ_MG_COUNT,
  TOP_WAITING_MG_COUNT,
  WAITING,
  WAITING_MG_UNREAD_CHAP_THRESHOLD,
} from "../../utils/constants";
import { equalOrIn } from "../../utils";
import { MangaAPI } from "../../api";
import { MangaContext } from "../../contexts";
import { useSelectedManga } from "./hooks";
import { useUpdateMultipleAPI } from "../../hooks";
import { notifyError, throwOnCriticalErrors } from "../../utils/error-handler";
import "../Mangas.less"; // TODO refactor

const { TabPane } = Tabs;

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
  shelf: [READING, WAITING, TO_READ],
  isCompleted: false,
};

const QuickAccess = () => {
  const [mangas, setMangas] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedManga, setSelectedManga, selectedMangaContext] = useSelectedManga();
  const [showHidden, setShowHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mangaCount, setMangaCount] = useState(NaN);
  const [openImg, setOpenImg] = useState(false);
  const [newMangaModalOpen, setNewMangaModalOpen] = useState(false);
  const [userNoteModalOpen, setUserNoteModalOpen] = useState(false);

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
    if (equalOrIn(newManga.shelf, TAB_MAPPING[tab].filters.shelf)) {
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

  const deleteMangaDone = ({ _id }) => {
    setSelectedManga(null);
    setMangas((prevState) => prevState.filter((mg) => mg._id !== _id));
  };

  const openNewMangaModal = () => setNewMangaModalOpen(true);
  const closeNewMangaModal = () => setNewMangaModalOpen(false);

  const openUserNoteModal = () => setUserNoteModalOpen(true);
  const closeUserNoteModal = () => setUserNoteModalOpen(false);

  const displayMangas = mangas.filter((mg) => showHidden || !mg.hidden);

  const pageHeader = (
    <MangaPageHeader
      title="Quick access"
      updateBtnText="Daily update"
      mangaCount={isLoading ? NaN : mangaCount}
      openNewMangaModal={openNewMangaModal}
      isUpdatingMangas={isUpdatingMangas}
      updateMangas={updateMangas}
      openUserNoteModal={openUserNoteModal}
    />
  );

  const tabs = (
    <Affix className="affix-container">
      <Tabs
        defaultActiveKey={tab}
        onChange={setTab}
        className="tab"
        tabBarExtraContent={
          <Tooltip placement="bottomRight" title={showHidden ? "Hide hidden mangas" : "Show hidden mangas"}>
            <Switch
              size="small"
              checked={showHidden}
              onChange={(v) => setShowHidden(v)}
              checkedChildren={<EyeOutlined />}
              unCheckedChildren={<EyeInvisibleOutlined />}
            />
          </Tooltip>
        }
      >
        {Object.entries(TAB_MAPPING).map(([tab, { displayName, description }]) => (
          <TabPane
            key={tab}
            tab={
              <Tooltip title={description} placement="bottomLeft">
                {displayName}
              </Tooltip>
            }
          />
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
              <MangaContext.Provider value={selectedMangaContext}>
                <RightPanel showImage={setOpenImg} />
              </MangaContext.Provider>
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

      <FAB
        openNewMangaModal={openNewMangaModal}
        isUpdatingMangas={isUpdatingMangas}
        updateMangas={updateMangas}
        openUserNote={openUserNoteModal}
      />

      <NewMangaModal open={newMangaModalOpen} onCancel={closeNewMangaModal} addMangaDone={addMangaDone} />

      <UserNote open={userNoteModalOpen} onCancel={closeUserNoteModal} />

      <Modal visible={openImg} footer={null} onCancel={() => setOpenImg(false)}>
        <MangaCover
          key={openImg?.src}
          className="modal-image"
          src={openImg?.src}
          mangaSite={openImg?.mangaSite}
          alt={openImg}
        />
      </Modal>
    </PageLayout>
  );
};

export default QuickAccess;
