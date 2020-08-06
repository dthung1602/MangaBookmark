import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import "./PageLayout.less";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PageLayout = ({ children, showFooter = true, showNavBar = true }) => {
  return (
    <Layout>
      {showNavBar ? <NavBar /> : null}
      {children}
      {showFooter ? <Footer /> : null}
    </Layout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
  showFooter: PropTypes.bool,
  showNavBar: PropTypes.bool,
};

export default PageLayout;
