import { useContext } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { GlobalContext } from "../../components/GlobalContext";
import { ROUTE_QUICK_ACCESS } from "../../utils/constants";
import { formatErrors, notifyError, throwOnCriticalErrors } from "../../utils/error-handler";
import { UserAPI } from "../../api";
import "./LoginForm.less";

const LoginForm = () => {
  const navigate = useNavigate();
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
        navigate(location?.state?.next || ROUTE_QUICK_ACCESS);
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

      <Button type="primary" htmlType="submit" block={true} className="login-form-submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
