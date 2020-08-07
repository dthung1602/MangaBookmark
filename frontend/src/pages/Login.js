import React from "react";
import { Button, Card, Divider, Layout } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

import PageLayout from "./PageLayout";
import LoginForm from "../components/LoginForm";
import { randomFrom } from "../utils";
import { ROUTE_LOGIN_GOOGLE, ROUTE_LOGIN_FACEBOOK } from "../utils/constants";
import backgroundImages from "../assets/background";
import "./Login.less";

const { Content } = Layout;

const Login = () => {
  const bgUrl = randomFrom(backgroundImages);

  return (
    <PageLayout showFooter={false}>
      <Content className="login-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <Card title="LOGIN" className="login-form">
          <LoginForm />
          <Divider>or</Divider>
          <Button className="login-gg-btn" block={true} href={ROUTE_LOGIN_GOOGLE}>
            <GoogleOutlined />
            <span>Login by Google</span>
          </Button>
          <Button className="login-fb-btn" block={true} href={ROUTE_LOGIN_FACEBOOK}>
            <FacebookOutlined />
            <span>Login by Facebook</span>
          </Button>
        </Card>
      </Content>
    </PageLayout>
  );
};

export default Login;
