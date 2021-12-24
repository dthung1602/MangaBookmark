import { useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Popconfirm } from "antd";
import { DeleteOutlined, SyncOutlined, FullscreenOutlined } from "@ant-design/icons";

import { buildMangaDetailPath } from "../../../utils";
import { MangaContext } from "../../../contexts";
import "./VerticalActions.less";

const VerticalActions = () => {
  const { manga, updateManga, deleteManga } = useContext(MangaContext);
  const history = useHistory();
  const viewDetail = useCallback(() => history.push(buildMangaDetailPath(manga)), [manga, history]);

  return (
    <div className="vertical-actions">
      <div className="detail" onClick={viewDetail}>
        <FullscreenOutlined />
        <span>Detail</span>
      </div>
      <div className="update" onClick={updateManga}>
        <SyncOutlined />
        <span>Update</span>
      </div>
      <Popconfirm title="Delete this manga?" placement="bottom" onConfirm={deleteManga}>
        <div className="delete">
          <DeleteOutlined />
          <span>Delete</span>
        </div>
      </Popconfirm>
    </div>
  );
};

export default VerticalActions;
