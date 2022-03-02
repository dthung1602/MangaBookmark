import { useContext } from "react";

import { Spin, Tooltip } from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";

import { MangaContext } from "../../../contexts";
import "./MarkAllButton.less";

const MarkAllButton = () => {
  const { markAll, isMarkingChapters, disableMarkAll } = useContext(MangaContext);

  return (
    <Tooltip title="Mark all as read" placement="bottom">
      <div className={`mark-all-btn ${disableMarkAll ? "disabled" : ""}`} onClick={markAll}>
        {isMarkingChapters ? <Spin indicator={<LoadingOutlined />} /> : <CheckOutlined />}
      </div>
    </Tooltip>
  );
};

export default MarkAllButton;
