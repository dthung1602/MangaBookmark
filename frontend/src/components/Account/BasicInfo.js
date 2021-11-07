import { useContext, useState } from "react";
import { Button, Form, Input, Upload, Spin, message } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import { UserAPI } from "../../api";
import { GlobalContext } from "../GlobalContext";
import { throwOnCriticalErrors, notifyError } from "../../utils/error-handler";
import ImgCrop from "antd-img-crop";

const BasicInfo = () => {
  const [{ user }, updateGlobalContext] = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);

  const handleUploadEvent = ({ file }) => {
    setIsAvatarUploading(file.status === "uploading");

    if (file.status === "error") {
      setAvatarError("Some thing went wrong");
    } else {
      setAvatarError(null);
    }

    if (file.status === "done") {
      if (file.response.status === "error") {
        setAvatarError(file.response.error);
      }
      setAvatarUrl(file.response.url);
      return file.response.url;
    }
    return avatarUrl;
  };

  const onFinish = (values) => {
    setIsLoading(true);
    values.avatar = avatarUrl; // ImgCrop does not play nice with ant Form -> a small hack here

    UserAPI.patch(values)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const newUser = await response.json();
        updateGlobalContext({ user: newUser });
        message.success("Account saved");
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  return (
    <>
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

        <Form.Item
          name="avatar"
          label="Avatar"
          hasFeedback={Boolean(avatarError)}
          validateStatus={avatarError ? "error" : undefined}
          help={avatarError}
        >
          <ImgCrop rotate shape="round">
            <Upload
              name="file"
              maxCount={1}
              listType="picture-card"
              showUploadList={false}
              action="/api/image/avatar"
              onChange={handleUploadEvent}
            >
              <Spin spinning={isAvatarUploading}>
                <img width={"80px"} src={avatarUrl} alt="avatar" />
              </Spin>
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isAvatarUploading}
          loading={isLoading}
          className="float-right"
        >
          Update
        </Button>
      </Form>
    </>
  );
};

export default BasicInfo;
