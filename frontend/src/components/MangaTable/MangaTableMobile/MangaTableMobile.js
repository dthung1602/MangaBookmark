import PropTypes from "prop-types";
import { Empty } from "antd";

import MangaCard from "./MangaCard";
import "./MangaTableMobile.less";

const skeleton = { isSkeleton: true };

const MangaTableMobile = ({ mangas, isLoading, updateMangaDone, deleteMangaDone }) => {
  let dataSource;
  if (isLoading === "reload") {
    dataSource = [skeleton, skeleton];
  } else if (isLoading) {
    dataSource = [...mangas, skeleton];
  } else {
    dataSource = mangas;
  }

  return (
    <div className="manga-table-mobile">
      {dataSource.length === 0 ? <Empty /> : null}
      {dataSource.map((manga) => {
        return (
          <MangaCard
            key={manga._id}
            isSkeleton={manga.isSkeleton}
            manga={manga}
            updateMangaDone={updateMangaDone}
            deleteMangaDone={deleteMangaDone}
          />
        );
      })}
    </div>
  );
};

MangaTableMobile.propTypes = {
  mangas: PropTypes.array.isRequired,
  isLoading: PropTypes.oneOf([true, false, "reload"]).isRequired,
  updateMangaDone: PropTypes.func.isRequired,
  deleteMangaDone: PropTypes.func.isRequired,
};

export default MangaTableMobile;
