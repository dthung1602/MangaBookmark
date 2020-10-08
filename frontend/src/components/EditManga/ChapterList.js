import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, Checkbox, Spin, Table, Popconfirm } from "antd";
import { DoubleLeftOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { changeChapterReadStatusLogic, getNextChapToRead } from "../../utils/chapters";
import { RIGHT_PANEL_TABLE_PAGE_SIZE } from "../../utils/constants";
import { truncString } from "../../utils";
import "./ChapterList.less";

const { Column } = Table;

function ChapterList({ manga, isLoading, onChangeChapterStatus, type, showDate = true, maxChapNameLen = 35 }) {
  const [showReadChapters, setShowReadChapters] = useState(true);

  const [checkboxChange, markUpTo, markAll] = changeChapterReadStatusLogic(manga, onChangeChapterStatus);

  const { chapters } = manga;
  const displayChapters = showReadChapters ? chapters : chapters.filter((ch) => !ch.isRead);
  const allChaptersRead = chapters.every((chap) => chap.isRead);

  let pagination = false;
  if (type === "page") {
    const nextChapIdx = getNextChapToRead(chapters)[1];
    pagination = {
      hideOnSinglePage: true,
      defaultCurrent: nextChapIdx === -1 ? 1 : Math.ceil((nextChapIdx + 1) / RIGHT_PANEL_TABLE_PAGE_SIZE),
      defaultPageSize: RIGHT_PANEL_TABLE_PAGE_SIZE,
    };
  }
  console.log(pagination);

  useEffect(() => setShowReadChapters(true), [chapters]);

  return (
    <div className={`chapter-list ${type}`}>
      <Spin spinning={isLoading}>
        <Table
          size="small"
          pagination={pagination}
          showHeader={false}
          dataSource={displayChapters}
          title={() => (
            <div className="table-header">
              <h4>Chapter list</h4>
              <div>
                <Button
                  size="small"
                  type="text"
                  icon={<ClockCircleOutlined />}
                  title={(showReadChapters ? "Hide" : "Show") + " read chapters"}
                  onClick={() => setShowReadChapters(!showReadChapters)}
                />
                <Popconfirm
                  title={"Mark all as read ?"}
                  placement="left"
                  disabled={allChaptersRead}
                  onConfirm={markAll}
                >
                  <Button
                    size="small"
                    type="text"
                    icon={<CheckOutlined />}
                    disabled={allChaptersRead}
                    title="Mark all as read"
                  />
                </Popconfirm>
              </div>
            </div>
          )}
        >
          <Column
            dataIndex="name"
            key="name"
            render={(text, chapter) => (
              <a href={chapter.link} target="_blank" rel="noopener noreferrer">
                {truncString(chapter.name, maxChapNameLen, true)}
              </a>
            )}
          />
          {showDate ? (
            <Column
              dataIndex="createdAt"
              key="createdAt"
              render={(text, chapter) => <i>{moment.utc(chapter.createdAt).fromNow()}</i>}
            />
          ) : null}
          <Column
            dataIndex="action"
            key="action"
            width={50}
            render={(text, chapter) => {
              return (
                <div className="action">
                  <Button icon={<DoubleLeftOutlined />} size="small" type="text" onClick={() => markUpTo(chapter)} />
                  &nbsp;&nbsp;
                  <Checkbox checked={chapter.isRead} onChange={() => checkboxChange(chapter)} />
                </div>
              );
            }}
          />
        </Table>
      </Spin>
    </div>
  );
}

ChapterList.propTypes = {
  manga: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChangeChapterStatus: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["scroll", "page"]).isRequired,
  showDate: PropTypes.bool,
  maxChapNameLen: PropTypes.number,
};

export default ChapterList;
