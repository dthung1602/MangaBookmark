import React from "react";
import PropTypes from "prop-types";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { ROUTE_LOGIN_FACEBOOK, ROUTE_LOGIN_GOOGLE } from "../../utils/constants";
import "./Button.less";

export const GoogleButton = ({ children }) => (
  <Button className="auth-gg-btn" block={true} href={ROUTE_LOGIN_GOOGLE}>
    <GoogleOutlined />
    <span>{children}</span>
  </Button>
);

export const FacebookButton = ({ children }) => (
  <Button className="auth-fb-btn" block={true} href={ROUTE_LOGIN_FACEBOOK}>
    <FacebookOutlined />
    <span>{children}</span>
  </Button>
);

GoogleButton.propTypes = FacebookButton.propTypes = {
  children: PropTypes.node,
};
