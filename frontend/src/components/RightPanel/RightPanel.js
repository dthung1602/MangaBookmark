import { useState } from "react";
import Proptypes from "prop-types";
import { Descriptions, Empty, message, Popconfirm, Spin, Typography, Space } from "antd";
import { DeleteOutlined, SyncOutlined, CheckOutlined } from "@ant-design/icons";

import MangaStatus from "../MangaStatus";
import MangaSiteLink from "../MangaSiteLink";
import MangaCover from "../MangaCover";
import { BasicFields, ChapterList, Note } from "../EditManga";
import { MangaAPI } from "../../api";
import { useMarkChapterAPI } from "../../hooks";
import { formatDate, isNonEmptyArray } from "../../utils";
import { throwOnCriticalErrors, notifyError } from "../../utils/error-handler";
import { changeChapterReadStatusLogic } from "../../utils/chapters";
import PLACE_HOLDER_IMG from "../../assets/right-panel-footer.webp";
import "./RightPanel.less";

const { Title, Paragraph } = Typography;

const RightPanel = ({ manga, showImage, deleteMangaDone, updateMangaDone }) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateManga = () => {
    setIsLoading(true);
    MangaAPI.update(manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const newManga = await response.json();
        message.success("Manga updated");
        updateMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const deleteManga = () => {
    setIsLoading(true);
    MangaAPI.delete(manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        message.success("Manga deleted");
        deleteMangaDone(manga._id);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const editManga = (field) => (value) => {
    setIsLoading(true);
    return MangaAPI.patch({ [field]: value }, manga._id)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const newManga = await response.json();
        // message.success();
        updateMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const [isChapterListLoading, markChapters] = useMarkChapterAPI(updateMangaDone);

  if (manga === null) {
    return (
      <div id="right-panel">
        <br /> <br /> <br />
        <Empty description="Click a row to view detail" />
      </div>
    );
  }

  const allChaptersRead = manga.chapters.every((chap) => chap.isRead);

  const markAllChapterAsRead = changeChapterReadStatusLogic(manga, markChapters)[2];

  return (
    <div id="right-panel">
      <Spin spinning={isLoading || isChapterListLoading}>
        <div className="manga-cover-image-wrapper">
          <MangaCover
            className="manga-cover-image"
            src={manga.image}
            mangaSite={manga.site}
            alt={manga.name}
            onClick={() => showImage({ src: manga.image, mangaSite: manga.site })}
          />
          <div className="quick-actions">
            <Popconfirm title="Delete this manga?" placement="left" onConfirm={deleteManga}>
              <div className="delete">
                <DeleteOutlined />
                <span>Delete</span>
              </div>
            </Popconfirm>
            <div className="update" onClick={updateManga}>
              <SyncOutlined />
              <span>Update</span>
            </div>
            {allChaptersRead ? null : (
              <div className="mark-all" onClick={markAllChapterAsRead}>
                <CheckOutlined />
                <span>Mark</span>
              </div>
            )}
          </div>
        </div>
        <Title level={3}>
          <a href={manga.link} target="_blank" rel="noopener noreferrer">
            {manga.name}
          </a>
        </Title>
        <Descriptions column={2} className="non-editable-info">
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
            <Note note={manga.note} editNote={editManga("note")} />
          </Descriptions.Item>
        </Descriptions>
        <BasicFields manga={manga} editManga={editManga} layout="row" />
        <ChapterList type="page" manga={manga} isLoading={isChapterListLoading} onChangeChapterStatus={markChapters} />
        <div className="placeholder">
          <img src={PLACE_HOLDER_IMG} alt="" />
        </div>
      </Spin>
    </div>
  );
};

RightPanel.propTypes = {
  manga: Proptypes.object,
  showImage: Proptypes.func.isRequired,
  deleteMangaDone: Proptypes.func.isRequired,
  updateMangaDone: Proptypes.func.isRequired,
};

export default RightPanel;
