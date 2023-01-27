import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { GlobalContext } from "../../components/GlobalContext";
import { ROUTE_ALL_MANGAS } from "../../utils/constants";
import { throwOnCriticalErrors, formatErrors, notifyError } from "../../utils/error-handler";
import { UserAPI } from "../../api";

const RegisterForm = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [globalState, updateGlobalState] = useContext(GlobalContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      delete values.confirmPassword;
      const response = await UserAPI.create(values).result;
      throwOnCriticalErrors(response);
      const data = await response.json();

      if (response.ok) {
        updateGlobalState({ user: data });
        navigate(ROUTE_ALL_MANGAS);
      } else {
        form.setFields(formatErrors(data.errors));
      }
    } catch (e) {
      notifyError(e);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: "Username is required" }]}>
        <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
          },
          {
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input placeholder="Email" prefix={<MailOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
          {
            min: 8,
            message: "Password must be at least 8 characters",
          },
        ]}
      >
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("The two passwords that you entered do not match!");
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block={true}>
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
