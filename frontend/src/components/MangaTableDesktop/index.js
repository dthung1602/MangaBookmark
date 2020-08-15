import React, { useState } from "react";
import { Typography } from "antd";
import { useQueryParams, StringParam, withDefault } from "use-query-params";

import Filters from "./Filters";
import MangaTable from "./MangaTable";
import EndOfList from "../EndOfList";
import { SORT_DEC_STATUS, READING, ALL } from "../../utils/constants";
import "./MangaTableDesktop.less";
import dummyManga from "./dummyManga.json";

const { Title } = Typography;

const MangaTableDesktop = () => {
  const [mangas, setMangas] = useState(Array(5).fill(dummyManga));
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useQueryParams({
    shelf: withDefault(StringParam, READING),
    status: withDefault(StringParam, ALL),
    sort: withDefault(StringParam, SORT_DEC_STATUS),
    search: StringParam,
  });
  const updateFilters = (values) => {
    console.log({ ...filters, ...values });
    setFilters({ ...filters, ...values }, "push");
  };

  const callback = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMangas([...mangas, ...Array(5).fill(dummyManga)]);
    }, 3500);
  };

  return (
    <div className="manga-table-desktop">
      <Title level={3}>All mangas</Title>
      <Filters filters={filters} updateFilters={updateFilters} />
      <MangaTable mangas={mangas} isLoading={isLoading} />
      <EndOfList onReached={callback} disabled={isLoading} />
    </div>
  );
};

export default MangaTableDesktop;
