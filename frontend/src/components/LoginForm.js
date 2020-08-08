import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Input, Tooltip } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { GlobalContext } from "./GlobalContext";
import { ROUTE_MANGAS, ROUTE_REGISTER } from "../utils/constants";
import { checkResponse, formatErrors, notifyError } from "../utils/error-handler";
import { AuthAPI } from "../api";

const LoginForm = () => {
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
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item label={<b>Username</b>} name="username" rules={[{ required: true, message: "Username is required" }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item label={<b>Password</b>} name="password" rules={[{ required: true, message: "Password is required" }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
      </Form.Item>

      <div className="auth-other-actions">
        <Tooltip title="Sorry, haven't implemented yet :(">
          <a>Forgot password?</a>
        </Tooltip>
        <Link to={ROUTE_REGISTER}>Register</Link>
      </div>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" block={true}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
