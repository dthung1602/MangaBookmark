import React, { useState } from "react";
import { Typography } from "antd";

import Filters from "./Filters";
import MangaTable from "./MangaTable";
import EndOfList from "../EndOfList";
import "./MangaTableDesktop.less";
import dummyManga from "./dummyManga.json";

const { Title } = Typography;

const MangaTableDesktop = () => {
  const [mangas, setMangas] = useState(Array(5).fill(dummyManga));
  const [isLoading, setIsLoading] = useState(false);

  const callback = () => {
    console.log(new Date());
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMangas([...mangas, ...Array(5).fill(dummyManga)]);
    }, 3500);
  };

  return (
    <div className="manga-table-desktop">
      <Title level={3}>All mangas</Title>
      <Filters filters={{}} />
      <MangaTable mangas={mangas} isLoading={isLoading} />
      <EndOfList onReached={callback} disabled={isLoading} />
    </div>
  );
};

export default MangaTableDesktop;
