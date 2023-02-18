import { useContext } from "react";

import { Skeleton, Table } from "antd";

import MangaTableDesktopRow from "./MangaTableDesktopRow";
import { MangaCover } from "../../components";
import { useDisplayMangas } from "../../hooks";
import { MangaListContext } from "../../contexts";
import "./MangaTableDesktop.less";

const { Column } = Table;

const MangaTableDesktop = () => {
  const { onMangaClicked } = useContext(MangaListContext);
  const dataSource = useDisplayMangas();

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
          console.log(manga._id)
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
