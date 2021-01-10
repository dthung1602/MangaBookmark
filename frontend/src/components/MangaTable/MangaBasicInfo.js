import React from "react";
import PropTypes from "prop-types";
import { Descriptions, Typography } from "antd";

import MangaStatus from "../MangaStatus";
import MangaSiteLink from "../MangaSiteLink";
import { SHELVES } from "../../utils/constants";
import "./MangaBasicInfo.less";

const { Title } = Typography;

function MangaBasicInfo({ manga, showTitle = true, headerExtra }) {
  return (
    <Descriptions
      title={
        showTitle ? (
          <Title level={4}>
            <a href={manga.link} target="_blank" rel="noopener noreferrer">
              {manga.name}
            </a>
          </Title>
        ) : undefined
      }
      extra={headerExtra}
      className="manga-basic-info"
      size="small"
      column={1}
    >
      <Descriptions.Item label="Site">
        <MangaSiteLink mangaSite={manga.mangaSite} />
      </Descriptions.Item>
      <Descriptions.Item label="Shelf">{SHELVES[manga.shelf]}</Descriptions.Item>
      <Descriptions.Item label="Status">
        <MangaStatus status={manga.status} />
      </Descriptions.Item>
      <Descriptions.Item label="New chap">{manga.newChapCount}</Descriptions.Item>
      <Descriptions.Item label="Unread">{manga.unreadChapCount}</Descriptions.Item>
    </Descriptions>
  );
}

MangaBasicInfo.propTypes = {
  manga: PropTypes.object.isRequired,
  showTitle: PropTypes.bool,
  headerExtra: PropTypes.node,
};

export default MangaBasicInfo;
