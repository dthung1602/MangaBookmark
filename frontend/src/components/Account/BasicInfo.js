import React, { useContext, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import { UserAPI } from "../../api";
import { GlobalContext } from "../GlobalContext";
import { checkResponse, notifyError } from "../../utils/error-handler";

const BasicInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ user }, updateGlobalContext] = useContext(GlobalContext);

  const onFinish = (values) => {
    setIsLoading(true);
    UserAPI.patch(values)
      .then(async (response) => {
        checkResponse(response);
        const newUser = await response.json();
        updateGlobalContext({ user: newUser });
        message.success("Account saved");
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={user}>
      <Form.Item name="username" label="Username" rules={[{ required: true, message: "Username is required" }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
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
        <Input prefix={<MailOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isLoading} className="float-right">
        Update
      </Button>
    </Form>
  );
};

export default BasicInfo;
