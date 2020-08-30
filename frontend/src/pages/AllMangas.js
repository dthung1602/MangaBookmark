import React, { useEffect, useState } from "react";
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import { Layout, Modal } from "antd";

import { Desktop, Mobile } from "../components/ScreenSize";
import PageLayout from "./PageLayout";
import FAB from "../components/FAB";
import PageHeader from "../components/PageHeader";
import RightPanel from "../components/RightPanel";
import Filters from "../components/Filters";
import MangaTableDesktop from "../components/MangaTable/MangaTableDesktop";
import MangaTableMobile from "../components/MangaTable/MangaTableMobile";
import NewMangaModal from "../components/NewMangaModal";
import EndOfList from "../components/EndOfList";
import { ANY, MANGA_PER_PAGE, SORT_DEC_STATUS } from "../utils/constants";
import { MangaAPI } from "../api";
import { useUpdateMultipleAPI } from "../hooks";
import { removeUndefinedAttrs, removeEmptyStringAttrs, disableBackgroundScrolling, scrollToTop } from "../utils";
import { checkResponse, notifyError } from "../utils/error-handler";
import "./Mangas.less";

const AllMangas = () => {
  const [mangas, setMangas] = useState([]);
  const [selectedManga, setSelectedManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [mangaCount, setMangaCount] = useState(NaN);
  const [allLoaded, setAllLoaded] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [newMangaModalOpen, setNewMangaModalOpen] = useState(false);

  const [filters, setFilters] = useQueryParams({
    shelf: withDefault(StringParam, ANY),
    status: withDefault(StringParam, ANY),
    sort: withDefault(StringParam, SORT_DEC_STATUS),
    search: StringParam,
    isCompleted: withDefault(StringParam, ANY),
    hidden: withDefault(StringParam, ANY),
    site: withDefault(StringParam, ANY),
    createdAtGTE: StringParam,
    createdAtLTE: StringParam,
    lastReleasedGTE: StringParam,
    lastReleasedLTE: StringParam,
  });

  disableBackgroundScrolling(openImg || newMangaModalOpen);

  const updateFilters = (values) => {
    const newFilters = { ...filters, ...values };
    removeEmptyStringAttrs(newFilters);
    removeUndefinedAttrs(newFilters);
    setFilters(newFilters, "push");
    setPage(1);
    setMangas([]);
    setSelectedManga(null);
  };

  useEffect(() => {
    setIsLoading(page === 1 ? "reload" : true);
    MangaAPI.find({ ...filters, page, perPage: MANGA_PER_PAGE })
      .then(async (response) => {
        checkResponse(response);
        const { data, totalItem, isLastPage } = await response.json();

        setMangaCount(totalItem);
        setAllLoaded(isLastPage);

        if (page === 1) {
          setMangas([...data]);
          setTimeout(scrollToTop, 500);
        } else {
          setMangas((prevState) => [...prevState, ...data]);
        }
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  }, [filters, page]);

  const [isUpdatingMangas, updateMangas] = useUpdateMultipleAPI(filters);

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

  const pageHeader = (
    <PageHeader
      title="All mangas"
      updateBtnText="Update matched mangas"
      mangaCount={mangaCount}
      openNewMangaModal={openNewMangaModal}
      isUpdatingMangas={isUpdatingMangas}
      updateMangas={updateMangas}
    />
  );
  const endOfList = <EndOfList onReached={() => setPage(page + 1)} disabled={isLoading || allLoaded} />;
  const filterBar = <Filters filters={filters} updateFilters={updateFilters} />;

  return (
    <PageLayout>
      <Layout>
        <Desktop
          render={() => (
            <>
              <div className="left-panel">
                {pageHeader}
                {filterBar}
                <MangaTableDesktop
                  mangas={mangas}
                  isLoading={isLoading}
                  updateMangaDone={updateMangaDone}
                  onMangaClicked={(manga) => setSelectedManga(manga)}
                  showImage={setOpenImg}
                />
                {endOfList}
              </div>
              <RightPanel
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
              {filterBar}
              <MangaTableMobile
                mangas={mangas}
                isLoading={isLoading}
                deleteMangaDone={deleteMangaDone}
                updateMangaDone={updateMangaDone}
              />
              {endOfList}
            </>
          )}
        />
      </Layout>

      <FAB openNewMangaModal={openNewMangaModal} isUpdatingMangas={isUpdatingMangas} updateMangas={updateMangas} />

      <NewMangaModal open={newMangaModalOpen} onCancel={closeNewMangaModal} />

      <Modal visible={openImg} footer={null} onCancel={() => setOpenImg(false)}>
        <img className="right-panel-cover-large" src={openImg} alt={openImg} />
      </Modal>
    </PageLayout>
  );
};

export default AllMangas;
