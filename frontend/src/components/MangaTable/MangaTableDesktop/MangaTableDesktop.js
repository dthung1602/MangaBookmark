import PropTypes from "prop-types";
import { Table, Skeleton, Typography } from "antd";

import MangaBasicInfo from "../MangaBasicInfo";
import MangaQuickActions from "./MangaQuickActions";
import MangaCover from "../../MangaCover";
import { statusToClassMapping } from "../utils";
import { isEmptyObject } from "../../../utils";
import { MANGA_PER_PAGE } from "../../../utils/constants";
import "./MangaTableDesktop.less";

const { Column } = Table;
const { Title } = Typography;

const skeletonData = Array(MANGA_PER_PAGE).fill({});

const MangaTableDesktop = ({ mangas, isLoading, updateMangaDone, onMangaClicked, showImage }) => {
  let dataSource;
  if (isLoading === "reload") {
    dataSource = skeletonData;
  } else if (isLoading) {
    dataSource = [...mangas, ...skeletonData];
  } else {
    dataSource = mangas;
  }

  return (
    <Table
      className="manga-table-desktop"
      dataSource={dataSource}
      showHeader={false}
      pagination={false}
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
            <MangaCover
              className="manga-cover-image"
              src={manga.image}
              mangaSite={manga.site}
              alt={manga.name}
              onClick={() => showImage({ src: manga.image, mangaSite: manga.site })}
            />
          );
        }}
      />
      <Column
        dataIndex="basicInfo"
        key="basicInfo"
        render={(text, manga) => {
          if (isEmptyObject(manga)) {
            return <Skeleton active />;
          }
          return (
            <div className={"triangle top-right " + statusToClassMapping[manga.status]}>
              <Title level={4}>
                <a href={manga.link} target="_blank" rel="noopener noreferrer">
                  {manga.name}
                </a>
              </Title>
              <div className="manga-details">
                <MangaBasicInfo manga={manga} showTitle={false} />
                <MangaQuickActions manga={manga} updateMangaDone={updateMangaDone} />
              </div>
            </div>
          );
        }}
      />
    </Table>
  );
};

MangaTableDesktop.propTypes = {
  mangas: PropTypes.array.isRequired,
  isLoading: PropTypes.oneOf([true, false, "reload"]).isRequired,
  updateMangaDone: PropTypes.func.isRequired,
  onMangaClicked: PropTypes.func.isRequired,
  showImage: PropTypes.func.isRequired,
};

export default MangaTableDesktop;
