import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import "./PageLayout.less";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PageLayout = ({ children }) => {
  return (
    <Layout>
      <NavBar />
      <Layout className="site-layout" style={{ marginRight: 200 }}>
        {children}
      </Layout>
      <Footer />
    </Layout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
