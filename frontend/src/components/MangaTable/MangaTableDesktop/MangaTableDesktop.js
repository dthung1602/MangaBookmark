import React from "react";
import PropTypes from "prop-types";
import { Table, Skeleton } from "antd";

import MangaBasicInfo from "./MangaBasicInfo";
import ChapterDropdownButton from "../../ChapterDropdownButton";
import { isEmptyObject } from "../../../utils";
import "./MangaTableDesktop.less";

const { Column } = Table;

const skeletonData = Array(5).fill({});

const MangaTableDesktop = ({ mangas, isLoading, onChangeReadStatus }) => {
  const dataSource = isLoading ? [...mangas, ...skeletonData] : mangas;

  return (
    <Table dataSource={dataSource} showHeader={false} pagination={false}>
      <Column
        dataIndex="image"
        key="image"
        width={100}
        render={(text, manga) => {
          if (isEmptyObject(manga)) {
            return <Skeleton.Image active />;
          }
          return <img className="cover-image" src={manga.image} alt={manga.name} />;
        }}
      />
      <Column
        dataIndex="basicInfo"
        key="basicInfo"
        width="75%"
        render={(text, manga) => {
          if (isEmptyObject(manga)) {
            return <Skeleton active />;
          }
          return <MangaBasicInfo {...manga} />;
        }}
      />
      <Column
        dataIndex="quickActions"
        key="quickActions"
        width="25%"
        render={(text, manga) => {
          if (isEmptyObject(manga)) {
            return <Skeleton.Button active />;
          }
          return (
            <ChapterDropdownButton
              chapters={manga.chapters}
              onChangeReadStatus={(isRead, chapIds) => onChangeReadStatus(manga, isRead, chapIds)}
            />
          );
        }}
      />
    </Table>
  );
};

MangaTableDesktop.propTypes = {
  mangas: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChangeReadStatus: PropTypes.func.isRequired,
};

export default MangaTableDesktop;
