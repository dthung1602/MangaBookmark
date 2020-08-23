import React, { useState } from "react";
import Proptypes from "prop-types";
import { Descriptions, Empty, Popconfirm, Typography } from "antd";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";

import LoopButton from "../Filters/LoopButton";
import FilterDropdown from "../Filters/FilterDropdown";
import ChapterList from "./ChapterList";
import { formatDate } from "../../utils";
import { MG_STATUSES, SHELVES } from "../../utils/constants";
import "./RightPanel.less";

const { Title } = Typography;

const RightPanel = ({ manga, showImage }) => {
  const [relativeTime, setRelativeTime] = useState(false);

  const edit = (field) => (value) => {
    console.log(field, value);
  };

  const deleteManga = () => {};

  if (manga === null) {
    return (
      <div id="right-panel">
        <br /> <br /> <br />
        <Empty description="Click a row to view detail" />
      </div>
    );
  }

  return (
    <div id="right-panel">
      <div className="manga-cover-image-wrapper">
        <img className="manga-cover-image" src={manga.image} alt={manga.name} onClick={() => showImage(manga.image)} />
        <div className="quick-actions">
          <div className="update">
            <SyncOutlined />
          </div>
          <Popconfirm title="Delete this manga?" placement="left" onConfirm={deleteManga}>
            <div className="delete">
              <DeleteOutlined />
            </div>
          </Popconfirm>
        </div>
      </div>
      <Title level={3}>
        <a href={manga.link} rel="noopener noreferrer">
          {manga.name}
        </a>
      </Title>
      <Descriptions column={2} className="non-editable-info">
        <Descriptions.Item label="Site" span={2}>
          {manga.site}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{MG_STATUSES[manga.status]}</Descriptions.Item>
        <Descriptions.Item label="Total chapters">{manga.chapters.length}</Descriptions.Item>
        <Descriptions.Item label="Unread">{manga.unreadChapCount}</Descriptions.Item>
        <Descriptions.Item label="New chap">{manga.newChapCount}</Descriptions.Item>
        <Descriptions.Item label="Last released">{formatDate(manga.lastReleased, relativeTime)}</Descriptions.Item>
        <Descriptions.Item label="Created at">{formatDate(manga.createdAt, relativeTime)}</Descriptions.Item>
        <Descriptions.Item label="Updated at" span={2}>
          {formatDate(manga.updatedAt, relativeTime)}
        </Descriptions.Item>
        <Descriptions.Item label="Note" span={2}>
          {manga.note}
        </Descriptions.Item>
      </Descriptions>
      <div className="editable-info">
        <FilterDropdown
          // size="small"
          displayName={"Shelf"}
          options={SHELVES}
          showAnyOption={false}
          selected={manga.shelf}
          onSelect={edit("shelf")}
          placement="topCenter"
        />
        <LoopButton
          // size="small"
          displayName={"Completed"}
          options={["true", "false"]}
          showAnyOption={false}
          selected={manga.isCompleted}
          onSelect={edit("isCompleted")}
        />
        <LoopButton
          // size="small"
          displayName={"Hidden"}
          options={["true", "false"]}
          showAnyOption={false}
          selected={manga.hidden}
          onSelect={edit("hidden")}
        />
      </div>
      <ChapterList onMarkUpTo={() => {}} chapters={manga.chapters} onMarkAll={() => {}} onCheckboxChange={() => {}} />
    </div>
  );
};

RightPanel.propTypes = {
  manga: Proptypes.object.isRequired,
  showImage: Proptypes.func.isRequired,
};

export default RightPanel;
