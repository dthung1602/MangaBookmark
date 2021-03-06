import { useEffect, useState } from "react";
import { StringParam, ArrayParam, useQueryParams, withDefault } from "use-query-params";
import { Layout, Modal } from "antd";

import { Desktop, Mobile } from "../components/ScreenSize";
import PageLayout from "./PageLayout";
import FAB from "../components/FAB";
import MangaPageHeader from "../components/MangaPageHeader";
import RightPanel from "../components/RightPanel";
import Filters from "../components/Filters";
import MangaTableDesktop from "../components/MangaTable/MangaTableDesktop";
import MangaTableMobile from "../components/MangaTable/MangaTableMobile";
import NewMangaModal from "../components/NewMangaModal";
import EndOfList from "../components/EndOfList";
import MangaCover from "../components/MangaCover";
import { ANY, MANGA_PER_PAGE, SORT_DEC_STATUS } from "../utils/constants";
import { MangaAPI } from "../api";
import { useUpdateMultipleAPI } from "../hooks";
import { removeUndefinedAttrs, removeEmptyStringAttrs, scrollToTop } from "../utils";
import { throwOnCriticalErrors, notifyError } from "../utils/error-handler";
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
    hidden: withDefault(StringParam, "false"),
    site: withDefault(StringParam, ANY),
    lang: withDefault(StringParam, ANY),
    tags: withDefault(ArrayParam, []),
    createdAtGTE: StringParam,
    createdAtLTE: StringParam,
    lastReleasedGTE: StringParam,
    lastReleasedLTE: StringParam,
  });

  const updateFilters = (values) => {
    const newFilters = { ...filters, ...values };
    removeEmptyStringAttrs(newFilters);
    removeUndefinedAttrs(newFilters);
    setFilters(newFilters, "push");
    setPage(1);
    setMangas([]);
    setSelectedManga(null);
  };

  const resetFilters = () => {
    setFilters({
      shelf: undefined,
      status: undefined,
      sort: undefined,
      search: undefined,
      isCompleted: undefined,
      hidden: "false",
      site: undefined,
      lang: undefined,
      tags: [],
      createdAtGTE: undefined,
      createdAtLTE: undefined,
      lastReleasedGTE: undefined,
      lastReleasedLTE: undefined,
    });
  };

  useEffect(() => {
    setIsLoading(page === 1 ? "reload" : true);
    const { abort, result } = MangaAPI.find({ ...filters, page, perPage: MANGA_PER_PAGE });
    result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        const { data, totalItem, isLastPage } = await response.json();

        setMangaCount(totalItem);
        setAllLoaded(isLastPage);
        setIsLoading(false);

        if (page === 1) {
          setMangas([...data]);
          setTimeout(scrollToTop, 500);
        } else {
          setMangas((prevState) => [...prevState, ...data]);
        }
      })
      .catch((e) => {
        // silently ignore AbortError while report others
        // if a request is aborted => another is being made => loading = true
        if (e.name !== "AbortError") {
          notifyError(e);
          setIsLoading(false);
        }
      });

    return abort;
  }, [filters, page]);

  const [isUpdatingMangas, updateMangas] = useUpdateMultipleAPI(filters);

  const addMangaDone = (newManga) => {
    setMangas([newManga, ...mangas]);
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

  const pageHeader = (
    <MangaPageHeader
      title="All mangas"
      updateBtnText="Update matched mangas"
      mangaCount={isLoading ? NaN : mangaCount}
      openNewMangaModal={openNewMangaModal}
      isUpdatingMangas={isUpdatingMangas}
      updateMangas={updateMangas}
    />
  );
  const endOfList = <EndOfList onReached={() => setPage(page + 1)} disabled={isLoading || allLoaded} />;
  const filterBar = <Filters filters={filters} updateFilters={updateFilters} resetFilters={resetFilters} />;

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

      <NewMangaModal open={newMangaModalOpen} onCancel={closeNewMangaModal} addMangaDone={addMangaDone} />

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

export default AllMangas;
