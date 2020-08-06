import React from "react";
import { Link } from "react-router-dom";
import { Card, Layout, Form, Input, Button, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "./Login.less";

import { ROUTE_REGISTER } from "../utils/constants";
import { randomFrom } from "../utils";
import PageLayout from "./PageLayout";
import backgroundImages from "../assets/background";

const { Content } = Layout;

const Login = () => {
  const bgUrl = randomFrom(backgroundImages);

  return (
    <PageLayout showFooter={false}>
      <Content className="login-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <Card title="LOGIN" className="login-form">
          <Form layout="vertical">
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <div className="login-other-action">
              <a>Forgot password?</a>
              <Link to={ROUTE_REGISTER}>Register</Link>
            </div>
            <Form.Item label={" "} name="submit">
              <Button type="primary" htmlType="submit" block={true}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Divider>or</Divider>
          <Button className="login-gg-btn" block={true}>
            <GoogleOutlined />
            <span>Login by Google</span>
          </Button>
          <Button className="login-fb-btn" block={true}>
            <FacebookOutlined />
            <span>Login by Facebook</span>
          </Button>
        </Card>
      </Content>
    </PageLayout>
  );
};

export default Login;
