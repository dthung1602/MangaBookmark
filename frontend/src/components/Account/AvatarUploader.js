import { useContext, useState } from "react";
import { Typography, Upload } from "antd";
import ImgCrop from "antd-img-crop";

import { GlobalContext } from "../GlobalContext";
import "./AvatarUploader.less";

const AvatarUploader = () => {
  const [{ user }, updateGlobalContext] = useContext(GlobalContext);
  const [uploadStatus, setUploadStatus] = useState("none");
  const [error, setError] = useState();
  const [fileList, setFileList] = useState([
    {
      status: "done",
      url: user.avatar,
    },
  ]);

  const onChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    setUploadStatus(file.status);
    setError(file.status === "error" ? "Something went wrong. Please try again" : null);
    if (file.status === "done") {
      updateGlobalContext({
        user: { ...user, avatar: file.response.url },
      });
    }
  };

  const buttonMessage = {
    none: "Select image",
    uploading: "...",
    done: "Select image",
    error: "Try again",
  }[uploadStatus];

  return (
    <div className="avatar-uploader">
      <Typography>Change avatar</Typography>
      <br />
      <ImgCrop rotate shape="round">
        <Upload
          fileList={fileList}
          onChange={onChange}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          maxCount={1}
          listType="picture-card"
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: false,
            showDownloadIcon: false,
          }}
          disabled={uploadStatus === "uploading"}
        >
          {buttonMessage}
        </Upload>
      </ImgCrop>
      {error ? <span className="upload-error">{error}</span> : null}
    </div>
  );
};

export default AvatarUploader;
