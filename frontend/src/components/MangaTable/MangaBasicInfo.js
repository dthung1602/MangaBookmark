import React from "react";
import PropTypes from "prop-types";
import { Descriptions, Typography } from "antd";

import { MG_STATUSES, SHELVES } from "../../utils/constants";
import "./MangaBasicInfo.less";

const { Title } = Typography;

function MangaBasicInfo({ manga }) {
  return (
    <Descriptions
      title={
        <Title level={4}>
          <a href={manga.link} target="_blank" rel="noopener noreferrer">
            {manga.name}
          </a>
        </Title>
      }
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
    // <>
    //   <table className="manga-basic-info">
    //     <tr>
    //       <td>Site</td>
    //       <td>{manga.site}</td>
    //     </tr>
    //     <tr>
    //       <td>Shelf</td>
    //       <td>{SHELVES[manga.shelf]}</td>
    //     </tr>
    //     <tr>
    //       <td>Status</td>
    //       <td>{MG_STATUSES[manga.status]}</td>
    //     </tr>
    //     <tr>
    //       <td>New chap</td>
    //       <td>{manga.newChapCount}</td>
    //     </tr>
    //     <tr>
    //       <td>Unread</td>
    //       <td>{manga.unreadChapCount}</td>
    /*    </tr>*/
    /*  </table>*/
    /*</>*/
  );
}

MangaBasicInfo.propTypes = {
  manga: PropTypes.object.isRequired,
};

export default MangaBasicInfo;
