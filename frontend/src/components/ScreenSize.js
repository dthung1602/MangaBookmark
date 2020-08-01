import { Grid } from "antd";
import PropTypes from "prop-types";

const { useBreakpoint } = Grid;

export const Desktop = ({ children, render }) => {
  const isDesktop = useBreakpoint().lg;
  if (!isDesktop) {
    return null;
  }
  return render ? render() : children;
};

Desktop.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
};

export const Mobile = ({ children, render }) => {
  const isMobile = !useBreakpoint().lg;
  if (!isMobile) {
    return null;
  }
  return render ? render() : children;
};

Mobile.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
};
