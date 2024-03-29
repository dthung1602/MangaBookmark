import { useState } from "react";

import { Button, Form, Input, message } from "antd";
import { LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

import { UserAPI } from "../../api";
import { throwOnCriticalErrors, notifyError, formatErrors } from "../../utils/error-handler";

const { useForm } = Form;

const Password = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();

  const onFinish = (values) => {
    setIsLoading(true);
    delete values.confirmPassword;

    UserAPI.changePassword(values)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        if (response.ok) {
          form.resetFields();
          message.success("Password changed");
        } else {
          const data = await response.json();
          form.setFields(formatErrors(data.errors));
        }
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        name="currentPassword"
        label="Current password"
        rules={[
          {
            required: true,
            message: "Please enter your old password",
          },
        ]}
      >
        <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} type="password" />
      </Form.Item>

      <Form.Item
        name="password"
        label="New password"
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
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm new password"
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
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isLoading} className="float-right">
        Change password
      </Button>
    </Form>
  );
};

export default Password;
