import PropTypes from "prop-types";
import "./MangaBanner.less";

const MangaBanner = ({ manga }) => {
  return (
    <div className="manga-banner">
      <div className="image-wrapper">
        <img src={manga.image} alt="" />
      </div>
      <h1>{manga.name}</h1>
    </div>
  );
};

MangaBanner.propTypes = {
  manga: PropTypes.object.isRequired,
};

export default MangaBanner;
