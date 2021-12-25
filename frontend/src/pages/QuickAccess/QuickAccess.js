import { useState } from "react";

import { Layout } from "antd";

import { Desktop, Mobile } from "../../components/ScreenSize";
import PageLayout from "../PageLayout";
import FAB from "../../components/FAB";
import MangaListingPageHeader from "../../parts/MangaListingPageHeader";
import NewMangaModal from "../../components/NewMangaModal";
import UserNote from "../../components/UserNoteModal/UserNoteModal";
import { MangaTableDesktop, MangaTableMobile, MangaTabs, PreviewRightPanel } from "../../parts";
import { READING, TO_READ, WAITING, REREAD } from "../../utils/constants";
import { MangaContext, MangaListContext } from "../../contexts";
import { TAB_MAPPING, useMangaTab } from "./hooks";
import { useMangaContext, useUpdateMultipleAPI } from "../../hooks";
import "../Mangas.less"; // TODO refactor

const DAILY_UPDATE_FILTERS = {
  shelf: [READING, WAITING, TO_READ, REREAD],
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

  // TODO merge edit,update,mark,delete into option
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
    <MangaListingPageHeader
      key="header"
      title="Quick access"
      updateFilter={DAILY_UPDATE_FILTERS}
      updateButtonText="Daily update"
    />
  );
  const tabs = <MangaTabs key="tabs" tab={tab} setTab={setTab} tabMappings={TAB_MAPPING} />;

  return (
    <PageLayout>
      <Layout>
        <Desktop
          render={() => (
            <>
              <div className="left-panel">
                <MangaListContext.Provider value={mangaListContext}>
                  {pageHeader}
                  {tabs}
                  <MangaTableDesktop key="table" />
                </MangaListContext.Provider>
              </div>
              <MangaContext.Provider value={selectedMangaContext}>
                <PreviewRightPanel />
              </MangaContext.Provider>
            </>
          )}
        />
        <Mobile
          render={() => (
            <MangaListContext.Provider value={mangaListContext}>
              {pageHeader}
              {tabs}
              <MangaTableMobile key="table" />
            </MangaListContext.Provider>
          )}
        />
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
