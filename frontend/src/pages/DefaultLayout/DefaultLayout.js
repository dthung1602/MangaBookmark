import PropTypes from "prop-types";
import { Layout } from "antd";

import { Footer, NavBar } from "../../parts";
import { FAB } from "../../components";

import "./DefaultLayout.less";

const DefaultLayout = ({ children, showFooter = true, showNavBar = true, fabConfig = false, containerClass = "" }) => {
  // TODO optimize do not rerender navbar & footer & FAB
  return (
    <Layout className={`default-layout ${containerClass}`}>
      {showNavBar ? <NavBar key="navbar" /> : null}
      <Layout>{children}</Layout>
      <FAB config={fabConfig} />
      {showFooter ? <Footer key="footer" /> : null}
    </Layout>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
  showFooter: PropTypes.bool,
  showNavBar: PropTypes.bool,
  fabConfig: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object).isRequired]),
  containerClass: PropTypes.string,
};

export default DefaultLayout;
