import { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Form, Input, Tooltip } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { GlobalContext } from "./GlobalContext";
import { ROUTE_QUICK_ACCESS, ROUTE_REGISTER } from "../utils/constants";
import { throwOnCriticalErrors, formatErrors, notifyError } from "../utils/error-handler";
import { UserAPI } from "../api";

const LoginForm = () => {
  const history = useHistory();
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [globalState, updateGlobalState] = useContext(GlobalContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await UserAPI.login(values).result;
      throwOnCriticalErrors(response, [401]);
      const data = await response.json();

      if (response.ok) {
        updateGlobalState({ user: data });
        history.push(location?.state?.next || ROUTE_QUICK_ACCESS);
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
