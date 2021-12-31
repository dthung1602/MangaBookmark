import PropTypes from "prop-types";

import Button from "./Button";
import "./VerticalButtonGroup.less";

const VerticalButtonGroup = ({ side, expandOnHover, children, className, style }) => {
  const hoverClass = expandOnHover ? "expand" : "";
  return (
    <div className={`vertical-button-group ${side} ${hoverClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

VerticalButtonGroup.Button = Button;

VerticalButtonGroup.propTypes = {
  side: PropTypes.oneOf(["left", "right"]).isRequired,
  expandOnHover: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default VerticalButtonGroup;
