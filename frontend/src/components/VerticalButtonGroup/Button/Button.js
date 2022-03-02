import PropTypes from "prop-types";

import "./Button.less";

const Button = ({ type, icon, children, selected, onClick, className = "", style = {} }) => {
  const selectedClass = selected ? "selected" : "";
  return (
    <div className={`vertical-button ${className}`} onClick={onClick} style={style}>
      <div className={`vertical-button-content ${selectedClass} ${type} `}>
        {icon}
        <span>{children}</span>
      </div>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "info", "warning", "danger"]).isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
export default Button;
