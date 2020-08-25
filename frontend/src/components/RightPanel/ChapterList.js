import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, Checkbox, Spin, Table, Popconfirm } from "antd";
import { DoubleLeftOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { useChapterListLogic } from "../../hooks";
import { truncString } from "../../utils";
import "./ChapterList.less";

const { Column } = Table;

function ChapterList({ manga, onChangeChapterStatus, changeChapterStatusAsync }) {
  const [showReadChapters, setShowReadChapters] = useState(true);

  const [isLoading, checkboxChange, markUpTo, markAll] = useChapterListLogic(
    manga,
    onChangeChapterStatus,
    changeChapterStatusAsync,
  );

  const { chapters } = manga;
  const displayChapters = showReadChapters ? chapters : chapters.filter((ch) => !ch.isRead);
  const allChaptersRead = chapters.every((chap) => chap.isRead);

  useEffect(() => setShowReadChapters(true), [chapters]);

  return (
    <div className="right-panel-chapter-list">
      <Spin spinning={isLoading}>
        <Table
          size="small"
          pagination={{ hideOnSinglePage: true }}
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
                  title={(showReadChapters ? "Hide" : "Show") + " unread chapters"}
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
                {truncString(chapter.name, 35, true)}
              </a>
            )}
          />
          <Column
            dataIndex="createdAt"
            key="createdAt"
            render={(text, chapter) => <i>{moment.utc(chapter.createdAt).fromNow()}</i>}
          />
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
  onChangeChapterStatus: PropTypes.func.isRequired,
  changeChapterStatusAsync: PropTypes.bool.isRequired,
};

export default ChapterList;
