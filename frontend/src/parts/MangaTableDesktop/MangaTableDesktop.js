import { useContext } from "react";

import { Skeleton, Table } from "antd";

import MangaTableDesktopRow from "./MangaTableDesktopRow";
import { MangaCover } from "../../components";
import { MangaListContext } from "../../contexts";
import { clonePlainObject } from "../../utils";
import { MANGA_PER_PAGE } from "../../utils/constants";
import "./MangaTableDesktop.less";

const { Column } = Table;

const skeletonData = Array(MANGA_PER_PAGE).fill({ isSkeleton: true });

const MangaTableDesktop = () => {
  const { isLoading, mangasToShow, onMangaClicked } = useContext(MangaListContext);

  // TODO optimize?
  const dataSource = clonePlainObject(isLoading ? [...mangasToShow, ...skeletonData] : mangasToShow);

  return (
    <Table
      className="manga-table-desktop"
      dataSource={dataSource}
      showHeader={false}
      pagination={false}
      onRow={(manga) => {
        return {
          onClick: () => (manga.isSkeleton ? null : onMangaClicked(manga)),
        };
      }}
    >
      <Column
        dataIndex="image"
        key="image"
        width={120}
        render={(text, manga) => {
          if (manga.isSkeleton) {
            return <Skeleton.Image active key={manga._id} />;
          }
          return (
            <MangaCover
              key={manga._id}
              className="manga-cover-image"
              src={manga.image}
              mangaSite={manga.site}
              alt={manga.name}
            />
          );
        }}
      />
      <Column
        dataIndex="_id"
        key="_id"
        render={(text, manga) => {
          if (manga.isSkeleton) {
            return <Skeleton active key={manga._id} />;
          }
          return <MangaTableDesktopRow key={manga._id} manga={manga} />;
        }}
      />
    </Table>
  );
};

export default MangaTableDesktop;
