import React, { useState } from "react";
import Proptypes from "prop-types";
import { Descriptions, Empty, message, Popconfirm, Spin, Typography } from "antd";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";

import MangaStatus from "../MangaStatus";
import { BasicFields, ChapterList, Note } from "../EditManga";
import { MangaAPI } from "../../api";
import { useMarkChapterAPI } from "../../hooks";
import { formatDate } from "../../utils";
import { throwOnCriticalErrors, notifyError } from "../../utils/error-handler";
import "./RightPanel.less";

const { Title } = Typography;

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

  return (
    <div id="right-panel">
      <Spin spinning={isLoading}>
        <div className="manga-cover-image-wrapper">
          <img
            className="manga-cover-image"
            src={manga.image}
            alt={manga.name}
            onClick={() => showImage(manga.image)}
          />
          <div className="quick-actions">
            <div className="update" onClick={updateManga}>
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
          <a href={manga.link} target="_blank" rel="noopener noreferrer">
            {manga.name}
          </a>
        </Title>
        <Descriptions column={2} className="non-editable-info">
          <Descriptions.Item label="Site" span={2}>
            {manga.site}
          </Descriptions.Item>
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
      </Spin>
    </div>
  );
};

RightPanel.propTypes = {
  manga: Proptypes.object.isRequired,
  showImage: Proptypes.func.isRequired,
  deleteMangaDone: Proptypes.func.isRequired,
  updateMangaDone: Proptypes.func.isRequired,
};

export default RightPanel;
