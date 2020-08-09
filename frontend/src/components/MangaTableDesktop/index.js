import React from "react";
import { Typography } from "antd";

import Filters from "./Filters";
import MangaTable from "./MangaTable";
import "./MangaTableDesktop.less";

const { Title } = Typography;

const MangaTableDesktop = () => {
  return (
    <div className="manga-table-desktop">
      <Title level={3}>All mangas</Title>
      <Filters filters={{}} />
      <MangaTable />
    </div>
  );
};

export default MangaTableDesktop;
