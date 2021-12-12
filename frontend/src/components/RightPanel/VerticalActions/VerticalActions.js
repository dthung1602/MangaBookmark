import { useContext } from "react";

import { Popconfirm } from "antd";
import { CheckOutlined, DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import { MangaContext } from "../../../contexts";
import "./VerticalActions.less";

const VerticalActions = () => {
  const { updateManga, deleteManga, disableMarkAll, markAll } = useContext(MangaContext);

  return (
    <div className="vertical-actions">
      <Popconfirm title="Delete this manga?" placement="right" onConfirm={deleteManga}>
        <div className="delete">
          <DeleteOutlined />
          <span>Delete</span>
        </div>
      </Popconfirm>
      <div className="update" onClick={updateManga}>
        <SyncOutlined />
        <span>Update</span>
      </div>
      {disableMarkAll ? null : (
        <div className="mark-all" onClick={markAll}>
          <CheckOutlined />
          <span>Mark all</span>
        </div>
      )}
    </div>
  );
};

export default VerticalActions;
