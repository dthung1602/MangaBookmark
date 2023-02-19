import { useContext } from "react";

import { Button, Space, Popconfirm, Skeleton } from "antd";
import { DoubleRightOutlined, SyncOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";

import { MangaCover } from "../../components";
import { MangaContext } from "../../contexts";
import { truncString } from "../../utils";
import "./MangaDetailLeftPanel.less";

const MangaDetailLeftPanel = () => {
  const { manga, isLoading, nextChapToRead, updateManga, deleteManga, markAll, disableMarkAll } =
    useContext(MangaContext);

  if (!manga || isLoading) {
    return (
      <Space direction="vertical" size="small" className="manga-detail-left-panel">
        <div className="ant-image" />
        <Skeleton.Button active block />
        <Skeleton.Button active block />
        <Skeleton.Button active block />
      </Space>
    );
  }

  return (
    <Space direction="vertical" size="small" className="manga-detail-left-panel">
      <MangaCover key="cover" src={manga.image} mangaSite={manga.site} />
      <Button key="read" type="primary" size="middle" block>
        <a href={nextChapToRead.link} target="_blank" rel="noreferrer noopener">
          {truncString(nextChapToRead.name, 20)} &nbsp;&nbsp; <DoubleRightOutlined />
        </a>
      </Button>
      {disableMarkAll ? undefined : (
        <Button key="mark-all" size="middle" block icon={<CheckOutlined />} onClick={markAll}>
          Mark all
        </Button>
      )}
      <Button key="update" size="middle" block icon={<SyncOutlined />} onClick={updateManga}>
        Update
      </Button>
      <Popconfirm title="Delete this manga?" placement="top" onConfirm={deleteManga}>
        <Button key="delete" size="middle" block danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default MangaDetailLeftPanel;
