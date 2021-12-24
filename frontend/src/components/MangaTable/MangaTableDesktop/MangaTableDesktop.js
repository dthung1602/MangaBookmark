import { useContext } from "react";

import { Grid, Skeleton, Table, Typography } from "antd";

import MangaBasicInfo from "../MangaBasicInfo";
import MangaQuickActions from "../QuickActions";
import MangaCover from "../../MangaCover";
import ExpandButton from "../ExpandButton";
import { MangaListContext } from "../../../contexts";
import { statusToClassMapping } from "../../../utils/manga";
import { clonePlainObject } from "../../../utils";
import { MANGA_PER_PAGE } from "../../../utils/constants";
import "./MangaTableDesktop.less";

const { Column } = Table;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const skeletonData = Array(MANGA_PER_PAGE).fill({ isSkeleton: true });

const MangaTableDesktop = () => {
  const { isLoading, mangasToShow, onMangaClicked, updateMangaDone } = useContext(MangaListContext);
  const mangaInfoColumn = useBreakpoint().xxl ? 2 : 1;

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

          return (
            <div key={manga._id} className={"triangle top-right " + statusToClassMapping[manga.status]}>
              <Title level={4} className="manga-title">
                <a href={manga.link} target="_blank" rel="noopener noreferrer">
                  {manga.name}
                </a>
                <ExpandButton manga={manga} />
              </Title>
              <div className="manga-details">
                <MangaBasicInfo manga={manga} showTitle={false} column={mangaInfoColumn} />
                <MangaQuickActions manga={manga} updateMangaDone={updateMangaDone} />
              </div>
            </div>
          );
        }}
      />
    </Table>
  );
};

export default MangaTableDesktop;
