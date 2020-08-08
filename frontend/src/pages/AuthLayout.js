import React from "react";
import PropTypes from "prop-types";
import { Card, Layout } from "antd";

import PageLayout from "./PageLayout";
import { randomFrom } from "../utils";
import backgroundImages from "../assets/background";
import "./AuthLayout.less";

const { Content } = Layout;

const AuthLayout = ({ showFooter = false, title, children }) => {
  const bgUrl = randomFrom(backgroundImages);

  return (
    <PageLayout showFooter={showFooter}>
      <Content className="auth-form-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <Card title={title} className="auth-form">
          {children}
        </Card>
      </Content>
    </PageLayout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  showFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default AuthLayout;
