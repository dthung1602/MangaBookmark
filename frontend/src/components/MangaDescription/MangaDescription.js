import { useContext } from "react";

import { Descriptions, Space, Typography } from "antd";

import MangaSiteLink from "../MangaSiteLink";
import MangaStatus from "../MangaStatus";
import MangaNote from "../MangaNote";
import { formatDate, isNonEmptyArray } from "../../utils";
import { MangaContext } from "../../contexts";
import "./MangaDesctiption.less";

const { Paragraph } = Typography;

const MangaDescription = () => {
  const { manga } = useContext(MangaContext);

  return (
    <Descriptions key="description" column={2} className="non-editable-info">
      <Descriptions.Item label="Site">
        <MangaSiteLink mangaSiteName={manga.site} />
      </Descriptions.Item>
      {isNonEmptyArray(manga.authors) ? (
        <Descriptions.Item label="Author">{manga.authors.join(" - ")}</Descriptions.Item>
      ) : null}
      {isNonEmptyArray(manga.alternativeNames) ? (
        <Descriptions.Item label="Other names" span={2}>
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
            {manga.alternativeNames.length > 1 ? "•" : ""} {manga.alternativeNames[0]}
            {manga.alternativeNames.slice(1).map((name) => (
              <>
                <br />• {name}
              </>
            ))}
          </Paragraph>
        </Descriptions.Item>
      ) : null}
      {isNonEmptyArray(manga.tags) ? (
        <Descriptions.Item label="Tags" span={2}>
          <Space wrap>
            {manga.tags.map((tagName) => (
              <div key={tagName} className="manga-tag">
                {tagName}
              </div>
            ))}
          </Space>
        </Descriptions.Item>
      ) : null}
      {manga.description ? (
        <Descriptions.Item label="Description" span={2}>
          <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>{manga.description}</Paragraph>
        </Descriptions.Item>
      ) : null}
      <Descriptions.Item label="Status">
        <MangaStatus status={manga.status} />
      </Descriptions.Item>
      <Descriptions.Item label="Total chapters">{manga.chapters.length}</Descriptions.Item>
      <Descriptions.Item label="Unread">{manga.unreadChapCount}</Descriptions.Item>
      <Descriptions.Item label="New chap">{manga.newChapCount}</Descriptions.Item>
      <Descriptions.Item label="Last released">{formatDate(manga.lastReleased)}</Descriptions.Item>
      <Descriptions.Item label="Created at">{formatDate(manga.createdAt)}</Descriptions.Item>
      <Descriptions.Item label="Updated at" span={2}>
        {formatDate(manga.updatedAt)}
      </Descriptions.Item>
      <Descriptions.Item label="Note" span={2} className="note-container">
        {/* TODO move note to UserInputProps */}
        <MangaNote />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MangaDescription;
