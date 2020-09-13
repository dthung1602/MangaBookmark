import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

import { MG_FINISHED, MG_LAST_CHAP_READ, MG_MANY_TO_READ, MG_NEW_CHAP, MG_STATUSES } from "../utils/constants";

const TAG_COLOR_MAPPING = {
  [MG_NEW_CHAP]: "green",
  [MG_MANY_TO_READ]: "yellow",
  [MG_LAST_CHAP_READ]: "blue",
  [MG_FINISHED]: "lightgrey",
};

const MangaStatus = ({ status }) => {
  return <Tag color={TAG_COLOR_MAPPING[status]}>{MG_STATUSES[status]}</Tag>;
};

MangaStatus.propTypes = {
  status: PropTypes.number.isRequired,
};

export default MangaStatus;
