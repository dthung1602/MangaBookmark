import React from "react";
import PropTypes from "prop-types";
import { Descriptions, Typography } from "antd";

import { MG_STATUSES, SHELVES } from "../../utils/constants";
import "./MangaBasicInfo.less";

const { Title } = Typography;

function MangaBasicInfo({ manga, headerExtra }) {
  return (
    <Descriptions
      title={
        <Title level={4}>
          <a href={manga.link} target="_blank" rel="noopener noreferrer">
            {manga.name}
          </a>
        </Title>
      }
      extra={headerExtra}
      className="manga-basic-info"
      size="small"
      column={1}
    >
      <Descriptions.Item label="Site">{manga.site}</Descriptions.Item>
      <Descriptions.Item label="Shelf">{SHELVES[manga.shelf]}</Descriptions.Item>
      <Descriptions.Item label="Status">{MG_STATUSES[manga.status]}</Descriptions.Item>
      <Descriptions.Item label="New chap">{manga.newChapCount}</Descriptions.Item>
      <Descriptions.Item label="Unread">{manga.unreadChapCount}</Descriptions.Item>
    </Descriptions>
  );
}

MangaBasicInfo.propTypes = {
  manga: PropTypes.object.isRequired,
  headerExtra: PropTypes.node,
};

export default MangaBasicInfo;
