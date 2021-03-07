import PropTypes from "prop-types";
import { Descriptions, Space, Typography } from "antd";

import MangaStatus from "../MangaStatus";
import MangaSiteLink from "../MangaSiteLink";
import { SHELVES } from "../../utils/constants";
import { isNonEmptyArray } from "../../utils";
import "./MangaBasicInfo.less";

const { Title, Paragraph } = Typography;

function MangaBasicInfo({ manga, showTitle = true, showAdditionalInfo = false, column = 1, headerExtra }) {
  let additionalInfo = null;

  if (showAdditionalInfo) {
    additionalInfo = [];
    if (isNonEmptyArray(manga.authors)) {
      additionalInfo.push(<Descriptions.Item label="Author">{manga.authors.join(" - ")}</Descriptions.Item>);
    }
    if (isNonEmptyArray(manga.alternativeNames)) {
      additionalInfo.push(
        <Descriptions.Item label="Other names">
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
            {manga.alternativeNames.length > 1 ? "•" : ""} {manga.alternativeNames[0]}
            {manga.alternativeNames.slice(1).map((name) => (
              <>
                <br />• {name}
              </>
            ))}
          </Paragraph>
        </Descriptions.Item>,
      );
    }
    if (isNonEmptyArray(manga.tags)) {
      additionalInfo.push(
        <Descriptions.Item label="Tags">
          <Space wrap>
            {manga.tags.map((tagName) => (
              <div key={tagName} className="manga-tag">
                {tagName}
              </div>
            ))}
          </Space>
        </Descriptions.Item>,
      );
    }
    if (manga.description) {
      additionalInfo.push(
        <Descriptions.Item label="Description">
          <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>{manga.description}</Paragraph>
        </Descriptions.Item>,
      );
    }
  }

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
      column={column}
    >
      <Descriptions.Item label="Site">
        <MangaSiteLink mangaSiteName={manga.site} />
      </Descriptions.Item>
      {additionalInfo}
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
  showAdditionalInfo: PropTypes.bool,
  column: PropTypes.number,
  headerExtra: PropTypes.node,
};

export default MangaBasicInfo;
