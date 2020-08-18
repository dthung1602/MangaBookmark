import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import "./Mangas.less";

import { Desktop, Mobile } from "../components/ScreenSize";
import PageLayout from "./PageLayout";
import FAB from "../components/FAB";
import RightPanel from "../components/RightPanel";
import FiltersDesktop from "../components/Filters/FiltersDesktop";
import FiltersMobile from "../components/Filters/FiltersMobile";
import MangaTableDesktop from "../components/MangaTable/MangaTableDesktop";
import MangaTableMobile from "../components/MangaTable/MangaTableMobile";
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import { ALL, MANGA_PER_PAGE, READING, SORT_DEC_STATUS } from "../utils/constants";
import { MangaAPI } from "../api";
import { checkResponse, notifyError } from "../utils/error-handler";
import EndOfList from "../components/EndOfList";

const { Title } = Typography;

const Mangas = () => {
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [mangaCount, setMangaCount] = useState(NaN);
  const [allLoaded, setAllLoaded] = useState(false);

  const [filters, setFilters] = useQueryParams({
    shelf: withDefault(StringParam, READING),
    status: withDefault(StringParam, ALL),
    sort: withDefault(StringParam, SORT_DEC_STATUS),
    search: StringParam,
    site: withDefault(StringParam, ALL),
  });
  const updateFilters = (values) => {
    setFilters({ ...filters, ...values }, "push");
    setPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    MangaAPI.find({ ...filters, page, perPage: MANGA_PER_PAGE })
      .then(async (response) => {
        checkResponse(response);
        const { data, totalItem, isLastPage } = await response.json();
        setAllLoaded(isLastPage);
        if (page === 1) {
          setMangas([...data]);
        } else {
          setMangas([...mangas, ...data]);
        }
        setMangaCount(totalItem);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  }, [filters, page]);

  const onChangeReadStatus = (manga, isRead, chapIds) => {
    // TODO
    // const cloneManga = clonePlainObject(manga);
    // cloneManga.chapters.forEach((ch) => {
    //   if (chapIds.includes(ch.link)) {
    //     ch.isRead = isRead;
    //   }
    // });
    // setManga(cloneManga);
  };

  return (
    <PageLayout>
      <Layout>
        <Desktop
          render={() => (
            <>
              <div className="manga-table-desktop">
                <div className="title">
                  <Title level={3}>All mangas</Title>
                  <span>
                    {mangaCount} manga{mangaCount > 1 ? "s" : ""}
                  </span>
                </div>
                <FiltersDesktop filters={filters} updateFilters={updateFilters} />
                <MangaTableDesktop mangas={mangas} isLoading={isLoading} onChangeReadStatus={onChangeReadStatus} />
                <EndOfList onReached={() => setPage(page + 1)} disabled={isLoading || allLoaded} />
              </div>
              <RightPanel />
            </>
          )}
        />
        <Mobile
          render={() => (
            <>
              <FiltersMobile />
              <MangaTableMobile />
            </>
          )}
        />
        <FAB />
      </Layout>
    </PageLayout>
  );
};

export default Mangas;
