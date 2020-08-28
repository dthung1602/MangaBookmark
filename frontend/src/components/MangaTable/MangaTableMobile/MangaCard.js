import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Dropdown, Menu, message, Modal, Skeleton, Spin } from "antd";
import {
  CloseOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  DoubleRightOutlined,
  EditOutlined,
  MoreOutlined,
  PlusSquareOutlined,
  RetweetOutlined,
} from "@ant-design/icons";

import { BasicFields, ChapterList, Note } from "../../EditManga";
import MangaBasicInfo from "../MangaBasicInfo";
import { MangaAPI } from "../../../api";
import { useMarkChapterAPI } from "../../../hooks";
import { changeChapterReadStatusLogic, getNextChapToRead } from "../../../utils/chapters";
import { checkResponse, notifyError } from "../../../utils/error-handler";
import { statusToClassMapping } from "../utils";
import { isEmptyObject, truncString } from "../../../utils";
import "./MangaCard.less";

const { confirm } = Modal;

const MangaCard = ({ manga, updateMangaDone, deleteMangaDone }) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChapterListLoading, onChangeChapterStatus] = useMarkChapterAPI(updateMangaDone);

  const statusClass = statusToClassMapping[manga.status];
  const nextChapToRead = getNextChapToRead(manga.chapters);
  // eslint-disable-next-line no-unused-vars
  const [markOne, markUpTo, markAll] = changeChapterReadStatusLogic(manga, onChangeChapterStatus);

  const markLatestChapter = () => {
    markOne(nextChapToRead);
  };

  const markAllWrapper = () => {
    confirm({
      title: "Mark all chapters as read?",
      onOk: markAll,
    });
  };

  const deleteManga = () => {
    confirm({
      title: "Delete this manga?",
      okType: "danger",
      onOk: () => {
        setIsLoading(true);
        MangaAPI.delete(manga._id)
          .then(async (response) => {
            checkResponse(response);
            message.success("Manga deleted");
            deleteMangaDone(manga._id);
          })
          .catch(notifyError)
          .finally(() => setIsLoading(false));
      },
    });
  };

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

  const editManga = (field) => (value) => {
    setIsLoading(true);
    return MangaAPI.patch({ [field]: value }, manga._id)
      .then(async (response) => {
        checkResponse(response);
        const newManga = await response.json();
        updateMangaDone(newManga);
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  if (isEmptyObject(manga)) {
    return (
      <Card
        className="manga-card"
        cover={
          <div className="cover">
            <Skeleton.Image />
          </div>
        }
      >
        <Skeleton active />
      </Card>
    );
  }

  let headerExtra;
  if (enableEdit) {
    headerExtra = <Button type="text" shape="circle" icon={<CloseOutlined />} onClick={() => setEnableEdit(false)} />;
  } else {
    headerExtra = (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item icon={<CheckSquareOutlined />} onClick={markAllWrapper} disabled={nextChapToRead.empty}>
              Mark all
            </Menu.Item>
            <Menu.Item icon={<PlusSquareOutlined />} onClick={markLatestChapter} disabled={nextChapToRead.empty}>
              Mark one
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} onClick={() => setEnableEdit(true)}>
              Edit
            </Menu.Item>
            <Menu.Item icon={<RetweetOutlined />} onClick={updateManga}>
              Update
            </Menu.Item>
            <Menu.Item danger icon={<DeleteOutlined />} onClick={deleteManga}>
              Delete
            </Menu.Item>
          </Menu>
        }
        trigger={["click", "hover"]}
      >
        <Button type="text" shape="circle" icon={<MoreOutlined />} />
      </Dropdown>
    );
  }
  console.log(nextChapToRead.empty);
  return (
    <Spin spinning={isLoading}>
      <Card
        className={`manga-card triangle bottom-right ${statusClass}`}
        cover={
          <div className="cover">
            <img alt={manga.name} src={manga.image} />
          </div>
        }
      >
        <div className={`collapsable ${enableEdit ? "collapsed" : ""}`}>
          <MangaBasicInfo manga={manga} headerExtra={headerExtra} />
          <a
            className={`next-chap-btn ${nextChapToRead.empty ? "empty" : ""}`}
            href={nextChapToRead.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncString(nextChapToRead.name, 35)} &nbsp;&nbsp; <DoubleRightOutlined />
          </a>
        </div>
        {enableEdit
          ? [
              <BasicFields key="basic" manga={manga} editManga={editManga} layout="column" />,
              <div className="note" key="note">
                <b>Note:</b> &nbsp; &nbsp;
                <Note editNote={editManga("note")} note={manga.note} />
              </div>,
              <ChapterList
                key="chapter"
                type="scroll"
                showDate={false}
                manga={manga}
                isLoading={isChapterListLoading}
                onChangeChapterStatus={onChangeChapterStatus}
                maxChapNameLen={27}
              />,
            ]
          : null}
      </Card>
    </Spin>
  );
};

MangaCard.propTypes = {
  manga: PropTypes.object.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
  deleteMangaDone: PropTypes.func.isRequired,
};

export default MangaCard;
