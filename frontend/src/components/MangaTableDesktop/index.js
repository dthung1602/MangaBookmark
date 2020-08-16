import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useQueryParams, StringParam, withDefault } from "use-query-params";

import Filters from "./Filters";
import MangaTable from "./MangaTable";
import EndOfList from "../EndOfList";
import { MangaAPI } from "../../api";
import { checkResponse, notifyError } from "../../utils/error-handler";
import { SORT_DEC_STATUS, READING, ALL, MANGA_PER_PAGE } from "../../utils/constants";
import "./MangaTableDesktop.less";
import { clonePlainObject } from "../../utils";

const { Title } = Typography;

const MangaTableDesktop = () => {
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
  });
  const updateFilters = (values) => {
    setFilters({ ...filters, ...values }, "push");
    setPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    MangaAPI.get({ ...filters, page, perPage: MANGA_PER_PAGE })
      .then(async (response) => {
        checkResponse(response);
        const { data, totalItem, isLastPage } = await response.json();
        setAllLoaded(isLastPage);
        setMangas([...mangas, ...data]);
        setMangaCount(totalItem);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  }, [filters, page]);

  const onChangeReadStatus = (manga, isRead, chapIds) => {
    // TODO
    // const cloneManga = clonePlainObject(manga);
    // cloneManga.chapters.forEach((ch) => {
    //   if (chapIds.includes(ch._id)) {
    //     ch.isRead = isRead;
    //   }
    // });
    // setManga(cloneManga);
  };

  return (
    <div className="manga-table-desktop">
      <div className="title">
        <Title level={3}>All mangas</Title>
        <span>
          {mangaCount} manga{mangaCount > 1 ? "s" : ""}
        </span>
      </div>
      <Filters filters={filters} updateFilters={updateFilters} />
      <MangaTable mangas={mangas} isLoading={isLoading} onChangeReadStatus={onChangeReadStatus} />
      <EndOfList onReached={() => setPage(page + 1)} disabled={isLoading || allLoaded} />
    </div>
  );
};

export default MangaTableDesktop;
