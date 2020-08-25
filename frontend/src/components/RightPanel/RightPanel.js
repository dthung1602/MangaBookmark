import React, { useState } from "react";
import Proptypes from "prop-types";
import { Descriptions, Empty, Popconfirm, Typography, Spin, message } from "antd";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";

import LoopButton from "../Filters/LoopButton";
import FilterDropdown from "../Filters/FilterDropdown";
import ChapterList from "./ChapterList";
import Note from "./Note";
import { MangaAPI } from "../../api";
import { formatDate } from "../../utils";
import { notifyError, checkResponse } from "../../utils/error-handler";
import { MG_STATUSES, SHELVES } from "../../utils/constants";
import "./RightPanel.less";

const { Title } = Typography;

const RightPanel = ({ manga, showImage, deleteMangaDone, updateMangaDone, onChangeReadStatus }) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateManga = () => {
    setIsLoading(true);
    MangaAPI.update(manga._id)
      .then(async (response) => {
        checkResponse(response);
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
      .then(async (response) => {
        checkResponse(response);
        message.success("Manga deleted");
        deleteMangaDone(manga._id);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const editManga = (field) => (value) => {
    setIsLoading(true);
    return MangaAPI.patch({ [field]: value }, manga._id)
      .then(async (response) => {
        checkResponse(response);
        const newManga = await response.json();
        // message.success();
        updateMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const checkboxChange = (chapter) => {
    onChangeReadStatus(manga._id, !chapter.isRead, [chapter.link]);
  };

  const markUpTo = (chapter) => {
    const idx = manga.chapters.indexOf(chapter);
    const chapsToMark = manga.chapters.filter((ch, i) => i >= idx && !ch.isRead).map((ch) => ch.link);
    onChangeReadStatus(manga._id, true, chapsToMark);
  };

  const markALl = () => {
    const chapsToMark = manga.chapters.filter((ch) => !ch.isRead).map((ch) => ch.link);
    onChangeReadStatus(manga._id, true, chapsToMark);
  };

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
          <Descriptions.Item label="Last released">{formatDate(manga.lastReleased)}</Descriptions.Item>
          <Descriptions.Item label="Created at">{formatDate(manga.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="Updated at" span={2}>
            {formatDate(manga.updatedAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Note" span={2} className="note-container">
            <Note note={manga.note} editNote={editManga("note")} />
          </Descriptions.Item>
        </Descriptions>
        <div className="editable-info">
          <FilterDropdown
            displayName={"Shelf"}
            options={SHELVES}
            showAnyOption={false}
            selected={manga.shelf}
            onSelect={editManga("shelf")}
          />
          <LoopButton
            displayName={"Completed"}
            options={["true", "false"]}
            showAnyOption={false}
            selected={String(manga.isCompleted)}
            onSelect={editManga("isCompleted")}
          />
          <LoopButton
            displayName={"Hidden"}
            options={["true", "false"]}
            showAnyOption={false}
            selected={String(manga.hidden)}
            onSelect={editManga("hidden")}
          />
        </div>
        <ChapterList
          chapters={manga.chapters}
          onMarkUpTo={markUpTo}
          onMarkAll={markALl}
          onCheckboxChange={checkboxChange}
        />
      </Spin>
    </div>
  );
};

RightPanel.propTypes = {
  manga: Proptypes.object.isRequired,
  showImage: Proptypes.func.isRequired,
  deleteMangaDone: Proptypes.func.isRequired,
  updateMangaDone: Proptypes.func.isRequired,
  onChangeReadStatus: Proptypes.func.isRequired,
};

export default RightPanel;
