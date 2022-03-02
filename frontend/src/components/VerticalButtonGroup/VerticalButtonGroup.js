import PropTypes from "prop-types";

import Button from "./Button";
import "./VerticalButtonGroup.less";

const VerticalButtonGroup = ({
  side,
  children,
  expandOnHover = true,
  solidColor = true,
  className = "",
  style = {},
}) => {
  const hoverClass = expandOnHover ? "expand" : "";
  const solidColorClass = solidColor ? "solid-color" : "";
  return (
    <div className={`vertical-button-group ${side} ${hoverClass} ${solidColorClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

VerticalButtonGroup.Button = Button;

VerticalButtonGroup.propTypes = {
  side: PropTypes.oneOf(["left", "right"]).isRequired,
  children: PropTypes.node.isRequired,
  expandOnHover: PropTypes.bool,
  solidColor: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default VerticalButtonGroup;
