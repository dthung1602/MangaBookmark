import React from "react";
import PropTypes from "prop-types";

const style = {
  display: "block",
  position: "absolute",
  bottom: 0,
  left: 0,
  padding: "0 8px",
  fontSize: "small",
  background: "rgba(0, 0, 0, 0.8)",
  color: "white",
};

const CornerImageSource = ({ name, url }) => {
  return (
    <a style={style} href={url} rel="noopener noreferrer" target="_blank">
      Image from {name}
    </a>
  );
};

CornerImageSource.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default CornerImageSource;
