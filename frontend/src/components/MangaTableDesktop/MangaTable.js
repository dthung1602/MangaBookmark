import React from "react";
import { Table } from "antd";

import MangaBasicInfo from "./MangaBasicInfo";
import MangaQuickAction from "./MangaQuickAction";
import dummyManga from "./dummyManga.json";

const { Column } = Table;

const dataSource = Array(5).fill(dummyManga);

const MangaTable = () => {
  return (
    <Table dataSource={dataSource} showHeader={false}>
      <Column
        dataIndex="image"
        key="image"
        width={100}
        render={(text, record) => {
          return <img className="cover-image" src={record.image} alt={record.name} />;
        }}
      />
      <Column
        dataIndex="basicInfo"
        key="basicInfo"
        width="75%"
        render={(text, record) => {
          return <MangaBasicInfo {...record} />;
        }}
      />
      <Column
        dataIndex="quickActions"
        key="quickActions"
        width="25%"
        render={(text, record) => {
          return <MangaQuickAction {...record} />;
        }}
      />
    </Table>
  );
};

export default MangaTable;
