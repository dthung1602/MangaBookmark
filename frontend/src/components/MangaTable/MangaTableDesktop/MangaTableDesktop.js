import React from "react";
import PropTypes from "prop-types";
import { Table, Skeleton } from "antd";

import MangaBasicInfo from "./MangaBasicInfo";
import ChapterDropdownButton from "../../ChapterDropdownButton";
import { isEmptyObject } from "../../../utils";
import { MANGA_PER_PAGE } from "../../../utils/constants";
import "./MangaTableDesktop.less";

const { Column } = Table;

const MangaTableDesktop = ({ mangas, mangaCount, isLoading, onChangeReadStatus }) => {
  let dataSource = mangas;
  if (isLoading) {
    const skeletonsToShow = Math.min(MANGA_PER_PAGE, mangaCount - mangas.length) || MANGA_PER_PAGE;
    dataSource = dataSource.concat(Array(skeletonsToShow).fill({}));
  }

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
  mangaCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChangeReadStatus: PropTypes.func.isRequired,
};

export default MangaTableDesktop;
