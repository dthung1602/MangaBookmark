import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import "./PageLayout.less";

import NavBar from "../components/NavBar";

const { Footer } = Layout;

const PageLayout = ({ children }) => {
  return (
    <Layout>
      <NavBar />
      <Layout className="site-layout" style={{ marginRight: 200 }}>
        {children}
      </Layout>
      <Footer style={{ textAlign: "center", zIndex: 1 }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
