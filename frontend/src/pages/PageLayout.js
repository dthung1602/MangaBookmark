import PropTypes from "prop-types";
import { Layout } from "antd";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FAB from "../components/FAB";

import "./PageLayout.less";

const PageLayout = ({ children, showFooter = true, showNavBar = true, fabConfig = false }) => {
  return (
    <Layout>
      {showNavBar ? <NavBar key="navbar" /> : null}
      {children}
      <FAB config={fabConfig} />
      {showFooter ? <Footer key="footer" /> : null}
    </Layout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
  showFooter: PropTypes.bool,
  showNavBar: PropTypes.bool,
  fabConfig: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object).isRequired]),
};

export default PageLayout;
