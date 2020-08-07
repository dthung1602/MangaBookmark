import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Layout, Form, Input, Button, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.less";

import { ROUTE_REGISTER, ROUTE_MANGAS } from "../utils/constants";
import { randomFrom } from "../utils";
import { checkResponse, notifyError, formatErrors } from "../utils/error-handler";
import PageLayout from "./PageLayout";
import backgroundImages from "../assets/background";
import { GlobalContext } from "../components/GlobalContext";
import { AuthAPI } from "../api";

const { Content } = Layout;

const Login = () => {
  const bgUrl = randomFrom(backgroundImages);
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [globalState, updateGlobalState] = useContext(GlobalContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await AuthAPI.login(values);
      checkResponse(response, [401]);
      const data = await response.json();
      if (response.ok) {
        updateGlobalState({ user: data });
        const redirect = new URLSearchParams(window.location.search).get("redirect");
        history.push(redirect || ROUTE_MANGAS);
      } else {
        form.setFields(formatErrors(data.errors));
      }
    } catch (e) {
      notifyError(e);
    }
  };

  return (
    <PageLayout showFooter={false}>
      <Content className="login-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <Card title="LOGIN" className="login-form">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label={<b>Username</b>}
              name="username"
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
              label={<b>Password</b>}
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
            </Form.Item>
            <div className="login-other-action">
              <a>Forgot password?</a>
              <Link to={ROUTE_REGISTER}>Register</Link>
            </div>
            <Form.Item label={" "}>
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
