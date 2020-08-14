import React from "react";
import PropTypes from "prop-types";
import { Table, Skeleton } from "antd";

import MangaBasicInfo from "./MangaBasicInfo";
import MangaQuickAction from "./MangaQuickAction";
import { isEmptyObject } from "../../utils";

const { Column } = Table;

const skeletonData = Array(5).fill({});

const MangaTable = ({ mangas, isLoading }) => {
  const dataSource = isLoading ? [...mangas, ...skeletonData] : mangas;

  return (
    <Table dataSource={dataSource} showHeader={false} pagination={false}>
      <Column
        dataIndex="image"
        key="image"
        width={100}
        render={(text, record) => {
          if (isEmptyObject(record)) {
            return <Skeleton.Image active />;
          }
          return <img className="cover-image" src={record.image} alt={record.name} />;
        }}
      />
      <Column
        dataIndex="basicInfo"
        key="basicInfo"
        width="75%"
        render={(text, record) => {
          if (isEmptyObject(record)) {
            return <Skeleton active />;
          }
          return <MangaBasicInfo {...record} />;
        }}
      />
      <Column
        dataIndex="quickActions"
        key="quickActions"
        width="25%"
        render={(text, record) => {
          if (isEmptyObject(record)) {
            return <Skeleton.Button active />;
          }
          return <MangaQuickAction {...record} />;
        }}
      />
    </Table>
  );
};

MangaTable.propTypes = {
  mangas: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default MangaTable;
