import { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Layout } from "antd";
import { FileTextOutlined, PlusOutlined, ReloadOutlined, UpOutlined } from "@ant-design/icons";

import { Desktop, Mobile } from "../../components/ScreenSize";
import MangaListingPageHeader from "../../parts/MangaListingPageHeader";
import NewMangaModal from "../../components/NewMangaModal";
import UserNoteModal from "../../components/UserNoteModal/UserNoteModal";
import { MangaTableDesktop, MangaTableMobile, PreviewRightPanel } from "../../parts";
import PageLayout from "../PageLayout";
import { scrollToTop } from "../../utils";
import { MangaContext, MangaListContext } from "../../contexts";
import { useMangaContext, useMangaListContext, useModal, useUpdateMultipleAPI } from "../../hooks";
import "./MangaListingPage.less";

const MangaListingPage = ({ title, mangasOrFactory, filterNode, updateMangaFilters, updateButtonText }) => {
  const { visible: newMangaModalVisible, closeModal: closeNewMangaModal, openModal: openNewMangaModal } = useModal();
  const { visible: noteModalVisible, closeModal: closeNoteModal, openModal: openNoteModal } = useModal();

  const [selectedManga, setSelectedManga] = useState(null);
  const setSelectedMangaToNull = useCallback(() => setSelectedManga(null), [setSelectedManga]);
  const mangaListContext = useMangaListContext(
    mangasOrFactory,
    setSelectedManga,
    setSelectedManga,
    setSelectedManga,
    setSelectedManga,
    setSelectedMangaToNull,
    setSelectedManga,
  );

  // TODO merge edit,update,mark,delete into option
  const selectedMangaContext = useMangaContext(
    selectedManga,
    mangaListContext.editMangaDone,
    mangaListContext.updateMangaDone,
    mangaListContext.markChaptersDone,
    mangaListContext.deleteMangaDone,
  );

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
  filterNode: PropTypes.node.isRequired,
  updateMangaFilters: PropTypes.object.isRequired,
  updateButtonText: PropTypes.string.isRequired,
};

export default MangaListingPage;
