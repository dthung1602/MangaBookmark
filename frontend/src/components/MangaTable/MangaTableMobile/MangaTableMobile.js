import React from "react";
import PropTypes from "prop-types";

import MangaCard from "./MangaCard";
import "./MangaTableMobile.less";

const MangaTableMobile = ({ mangas, isLoading, updateMangaDone, deleteMangaDone }) => {
  const dataSource = isLoading ? [...mangas, {}] : mangas;

  return (
    <div className="manga-table-mobile">
      {dataSource.map((manga) => {
        return (
          <MangaCard
            key={manga._id}
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
  isLoading: PropTypes.bool.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
  deleteMangaDone: PropTypes.func.isRequired,
};

export default MangaTableMobile;
