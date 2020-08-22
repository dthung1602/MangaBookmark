import React, { useEffect, useState } from "react";
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import { Layout, PageHeader } from "antd";

import { Desktop, Mobile } from "../components/ScreenSize";
import PageLayout from "./PageLayout";
import FAB from "../components/FAB";
import RightPanel from "../components/RightPanel";
import Filters from "../components/Filters";
import MangaTableDesktop from "../components/MangaTable/MangaTableDesktop";
import MangaTableMobile from "../components/MangaTable/MangaTableMobile";
import EndOfList from "../components/EndOfList";
import { ANY, MANGA_PER_PAGE, SORT_DEC_STATUS } from "../utils/constants";
import { MangaAPI } from "../api";
import { removeUndefinedAttrs, removeEmptyStringAttrs } from "../utils";
import { checkResponse, notifyError } from "../utils/error-handler";
import "./AllMangas.less";

const AllMangas = () => {
  const [mangas, setMangas] = useState([]);
  const [selectedManga, setSelectedManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [mangaCount, setMangaCount] = useState(NaN);
  const [allLoaded, setAllLoaded] = useState(false);

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
    setIsLoading(true);
    MangaAPI.find({ ...filters, page, perPage: MANGA_PER_PAGE })
      .then(async (response) => {
        checkResponse(response);
        const { data, totalItem, isLastPage } = await response.json();

        setMangaCount(totalItem);
        setAllLoaded(isLastPage);

        data.forEach((mg) => (mg.isLoading = false));
        if (page === 1) {
          setMangas([...data]);
        } else {
          setMangas((prevState) => [...prevState, ...data]);
        }
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  }, [filters, page]);

  const onChangeReadStatus = (mangaId, isRead, chapLinks) => {
    setMangas((prevState) => {
      prevState.find((mg) => mg._id === mangaId).isLoading = true;
      return [...prevState];
    });

    MangaAPI.markChapters(mangaId, isRead, chapLinks)
      .then(async (response) => {
        checkResponse(response);
        const newManga = await response.json();
        newManga.isLoading = false;
        setMangas((prevState) => {
          const idx = prevState.findIndex((mg) => mg._id === mangaId);
          prevState[idx] = newManga;
          return [...prevState];
        });
      })
      .catch((e) => {
        notifyError(e);
        setMangas((prevState) => {
          prevState.find((mg) => mg._id === mangaId).isLoading = false;
          return [...prevState];
        });
      });
  };

  const mangaCountString = `${mangaCount} manga${mangaCount > 1 ? "s" : ""}`;
  const pageHeader = (
    <PageHeader
      title="All mangas"
      extra={mangaCountString}
      className="manga-table-title"
      backIcon={false}
      ghost={false}
    />
  );

  return (
    <PageLayout>
      <Layout>
        <Desktop
          render={() => (
            <>
              <div className="left-panel">
                {pageHeader}
                <Filters filters={filters} updateFilters={updateFilters} />
                <MangaTableDesktop
                  mangas={mangas}
                  isLoading={isLoading}
                  onChangeReadStatus={onChangeReadStatus}
                  onMangaClicked={(manga) => setSelectedManga(manga)}
                />
                <EndOfList onReached={() => setPage(page + 1)} disabled={isLoading || allLoaded} />
              </div>
              <RightPanel manga={selectedManga} />
            </>
          )}
        />
        <Mobile
          render={() => (
            <>
              {pageHeader}
              <Filters filters={filters} updateFilters={updateFilters} />
              <MangaTableMobile mangas={mangas} isLoading={isLoading} onChangeReadStatus={onChangeReadStatus} />
              <EndOfList onReached={() => setPage(page + 1)} disabled={isLoading || allLoaded} />
            </>
          )}
        />
        <FAB />
      </Layout>
    </PageLayout>
  );
};

export default AllMangas;
