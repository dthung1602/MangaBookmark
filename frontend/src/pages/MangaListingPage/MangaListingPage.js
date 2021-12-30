import { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Layout } from "antd";
import { FileTextOutlined, PlusOutlined, ReloadOutlined, UpOutlined } from "@ant-design/icons";

import { ScreenSize, MangaListingPageHeader, UserNoteModal, EndOfList } from "../../components";
import { MangaTableDesktop, MangaTableMobile, PreviewRightPanel, NewMangaModal } from "../../parts";
import PageLayout from "../PageLayout";
import { doNothing, scrollToTop } from "../../utils";
import { MangaContext, MangaListContext } from "../../contexts";
import { useMangaAPIContext, useMangaListContext, useModal, useUpdateMultipleAPI } from "../../hooks";
import "./MangaListingPage.less";

const { Desktop, Mobile } = ScreenSize;

const MangaListingPage = ({
  title,
  mangasOrFactory,
  loadMode,
  filterNode,
  updateMangaFilters,
  updateButtonText,
  onReachedEndOfList = doNothing,
}) => {
  const { visible: newMangaModalVisible, closeModal: closeNewMangaModal, openModal: openNewMangaModal } = useModal();
  const { visible: noteModalVisible, closeModal: closeNoteModal, openModal: openNoteModal } = useModal();

  const [selectedManga, setSelectedManga] = useState(null);
  const setSelectedMangaToNull = useCallback(() => setSelectedManga(null), [setSelectedManga]);

  const mangaListContext = useMangaListContext(mangasOrFactory, loadMode, {
    addMangaDone: setSelectedManga,
    editMangaDone: setSelectedManga,
    updateMangaDone: setSelectedManga,
    markChaptersDone: setSelectedManga,
    deleteMangaDone: setSelectedMangaToNull,
    onMangaClicked: setSelectedManga,
  });

  const selectedMangaContext = useMangaAPIContext(selectedManga, mangaListContext);

  const [isUpdatingMangas, updateMangas] = useUpdateMultipleAPI(updateMangaFilters);

  useEffect(setSelectedMangaToNull, [mangasOrFactory]);

  const fabConfig = [
    {
      title: "Back to top",
      icon: <UpOutlined />,
      onClick: scrollToTop,
    },
    {
      title: "Update mangas in page",
      icon: <ReloadOutlined />,
      onClick: updateMangas,
    },
    {
      title: "Note",
      icon: <FileTextOutlined />,
      onClick: openNoteModal,
    },
    {
      title: "New manga",
      icon: <PlusOutlined />,
      onClick: openNewMangaModal,
    },
  ];

  const pageHeader = (
    <MangaListingPageHeader
      key="header"
      title={title}
      updateButtonText={updateButtonText}
      isUpdatingMangas={isUpdatingMangas}
      updateMangas={updateMangas}
      openNoteModal={openNoteModal}
      openNewMangaModal={openNewMangaModal}
    />
  );

  const endOfList = (
    <EndOfList onReached={onReachedEndOfList} disabled={mangaListContext.isLoading || mangaListContext.allLoaded} />
  );

  return (
    <PageLayout fabConfig={fabConfig}>
      <Layout>
        <Desktop
          render={() => (
            <>
              <div className="listing-left-panel">
                <MangaListContext.Provider value={mangaListContext}>
                  {pageHeader}
                  {filterNode}
                  <MangaTableDesktop key="table" />
                  {endOfList}
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
              {filterNode}
              <MangaTableMobile key="table" />
              {endOfList}
            </MangaListContext.Provider>
          )}
        />
      </Layout>

      <NewMangaModal
        open={newMangaModalVisible}
        onCancel={closeNewMangaModal}
        addMangaDone={mangaListContext.addMangaDone}
      />

      <UserNoteModal open={noteModalVisible} onCancel={closeNoteModal} />
    </PageLayout>
  );
};

MangaListingPage.propTypes = {
  title: PropTypes.string.isRequired,
  mangasOrFactory: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  loadMode: PropTypes.oneOf(["append", "replace"]).isRequired,
  filterNode: PropTypes.node.isRequired,
  updateMangaFilters: PropTypes.object.isRequired,
  updateButtonText: PropTypes.string.isRequired,
  onReachedEndOfList: PropTypes.func,
};

export default MangaListingPage;
