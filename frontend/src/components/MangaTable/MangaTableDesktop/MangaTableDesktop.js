import React from "react";
import PropTypes from "prop-types";
import { Table, Skeleton } from "antd";

import MangaBasicInfo from "../MangaBasicInfo";
import MangaQuickActions from "./MangaQuickActions";
import { statusToClassMapping } from "../utils";
import { isEmptyObject } from "../../../utils";
import { MANGA_PER_PAGE } from "../../../utils/constants";
import "./MangaTableDesktop.less";

const { Column } = Table;

const skeletonData = Array(MANGA_PER_PAGE).fill({});

const MangaTableDesktop = ({ mangas, isLoading, updateMangaDone, onMangaClicked, showImage }) => {
  const dataSource = isLoading ? [...mangas, ...skeletonData] : mangas;

  return (
    <Table
      className="manga-table-desktop"
      dataSource={dataSource}
      showHeader={false}
      pagination={false}
      rowClassName={(manga) => "triangle top-right " + statusToClassMapping[manga.status]}
      onRow={(manga) => {
        return {
          onClick: () => (isEmptyObject(manga) ? null : onMangaClicked(manga)),
        };
      }}
    >
      <Column
        dataIndex="image"
        key="image"
        width={120}
        render={(text, manga) => {
          if (isEmptyObject(manga)) {
            return <Skeleton.Image active />;
          }
          return (
            <img
              className="manga-cover-image"
              src={manga.image}
              alt={manga.name}
              onClick={() => showImage(manga.image)}
            />
          );
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
          return <MangaBasicInfo manga={manga} />;
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
          return <MangaQuickActions manga={manga} updateMangaDone={updateMangaDone} />;
        }}
      />
    </Table>
  );
};

MangaTableDesktop.propTypes = {
  mangas: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
  onMangaClicked: PropTypes.func.isRequired,
  showImage: PropTypes.func.isRequired,
};

export default MangaTableDesktop;
