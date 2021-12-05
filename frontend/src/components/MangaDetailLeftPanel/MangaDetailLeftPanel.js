import Proptypes from "prop-types";

import MangaCover from "../MangaCover";

import "./MangaDetailLeftPanel.less";

const MangaDetailLeftPanel = ({ manga }) => {
  return (
    <div className="manga-detail-left-panel">
      <MangaCover src={manga.image} mangaSite={manga.site} className="manga-cover-image" />
    </div>
  );
};

MangaDetailLeftPanel.propTypes = {
  manga: Proptypes.object.isRequired,
};

export default MangaDetailLeftPanel;
