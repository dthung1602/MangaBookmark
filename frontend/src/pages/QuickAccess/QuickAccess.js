import { useState } from "react";
import { Affix, Layout, Switch, Tabs, Tooltip } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { Desktop } from "../../components/ScreenSize";
import PageLayout from ".././PageLayout";
import FAB from "../../components/FAB";
import MangaPageHeader from "../../components/MangaPageHeader";
import RightPanel from "../../components/RightPanel";
import MangaTableDesktop from "../../components/MangaTable/MangaTableDesktop";
import NewMangaModal from "../../components/NewMangaModal";
import UserNote from "../../components/UserNoteModal/UserNoteModal";
import { READING, TO_READ, WAITING } from "../../utils/constants";
import { MangaContext, MangaListContext } from "../../contexts";
import { TAB_MAPPING, useMangaTab } from "./hooks";
import { useUpdateMultipleAPI, useMangaContext } from "../../hooks";
import "../Mangas.less"; // TODO refactor

const { TabPane } = Tabs;

const DAILY_UPDATE_FILTERS = {
  shelf: [READING, WAITING, TO_READ],
  isCompleted: false,
};

const QuickAccess = () => {
  /**
   * TODO Refactor modals
   * 1. mount fab in App
   * 2. configurable actions buttons in fab
   * 3. fab is configured using global context
   * 4. modal open states/set open state are stored in global context
   * 5. QuickAccess gets setNewMangaModalOpen from global context and register it as fab action
   * 6. QuickAccess mounts Modal & FAB
   */
  const [newMangaModalOpen, setNewMangaModalOpen] = useState(false);
  const [userNoteModalOpen, setUserNoteModalOpen] = useState(false);

  const [selectedManga, setSelectedManga] = useState(null);
  const { tab, setTab, mangaListContext } = useMangaTab(setSelectedManga);

  const selectedMangaContext = useMangaContext(
    selectedManga,
    mangaListContext.editMangaDone,
    mangaListContext.updateMangaDone,
    mangaListContext.markChaptersDone,
    mangaListContext.deleteMangaDone,
  );

  const [isUpdatingMangas, updateMangas] = useUpdateMultipleAPI(DAILY_UPDATE_FILTERS);

  const openNewMangaModal = () => setNewMangaModalOpen(true);
  const closeNewMangaModal = () => setNewMangaModalOpen(false);

  const openUserNoteModal = () => setUserNoteModalOpen(true);
  const closeUserNoteModal = () => setUserNoteModalOpen(false);

  const pageHeader = (
    <MangaPageHeader
      title="Quick access"
      updateBtnText="Daily update"
      mangaCount={mangaListContext.totalFound}
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
          <Tooltip
            placement="bottomRight"
            title={mangaListContext.showHidden ? "Hide hidden mangas" : "Show hidden mangas"}
          >
            <Switch
              size="small"
              checked={mangaListContext.showHidden}
              onChange={(v) => mangaListContext.setShowHidden(v)}
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
                <MangaListContext.Provider value={mangaListContext}>
                  <MangaTableDesktop />
                </MangaListContext.Provider>
              </div>
              <MangaContext.Provider value={selectedMangaContext}>
                <RightPanel />
              </MangaContext.Provider>
            </>
          )}
        />

        {/* TODO re enable this */}
        {/*<Mobile*/}
        {/*  render={() => (*/}
        {/*    <>*/}
        {/*      {pageHeader}*/}
        {/*      {tabs}*/}
        {/*      <MangaTableMobile*/}
        {/*        mangas={displayMangas}*/}
        {/*        isLoading={isLoading}*/}
        {/*        deleteMangaDone={deleteMangaDone}*/}
        {/*        updateMangaDone={updateMangaDone}*/}
        {/*      />*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*/>*/}
      </Layout>

      <FAB
        openNewMangaModal={openNewMangaModal}
        isUpdatingMangas={isUpdatingMangas}
        updateMangas={updateMangas}
        openUserNote={openUserNoteModal}
      />

      <NewMangaModal
        open={newMangaModalOpen}
        onCancel={closeNewMangaModal}
        addMangaDone={mangaListContext.addMangaDone}
      />

      <UserNote open={userNoteModalOpen} onCancel={closeUserNoteModal} />
    </PageLayout>
  );
};

export default QuickAccess;
