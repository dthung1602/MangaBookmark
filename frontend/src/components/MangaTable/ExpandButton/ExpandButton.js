import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FullscreenOutlined } from "@ant-design/icons";

import { buildMangaDetailPath } from "../../../utils";
import "./ExpandButton.less";

const ExpandButton = ({ manga }) => {
  return (
    <Link to={buildMangaDetailPath(manga)} className="expand-btn">
      <FullscreenOutlined />
    </Link>
  );
};

ExpandButton.propTypes = {
  manga: PropTypes.object.isRequired,
};

export default ExpandButton;
