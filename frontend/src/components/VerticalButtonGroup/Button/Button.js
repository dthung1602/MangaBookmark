import PropTypes from "prop-types";

import "./Button.less";

const Button = ({ type, icon, children, onClick, className, style }) => {
  return (
    <div className={`vertical-button ${type} ${className}`} onClick={onClick} style={style}>
      {icon}
      <span>{children}</span>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "info", "warning", "danger"]).isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
export default Button;
