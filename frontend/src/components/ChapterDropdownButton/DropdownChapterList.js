import React, { useState } from "react";
import PropTypes from "prop-types";
import { Affix, Button, Checkbox, Empty, Popconfirm, Spin } from "antd";
import { CheckOutlined, ClockCircleOutlined, DoubleRightOutlined, PlusSquareOutlined } from "@ant-design/icons";

import { changeChapterReadStatusLogic, getNextChapToRead } from "../../utils/chapters";

import "./DropdownChapterList.less";

function DropdownChapterList({ manga, onChangeChapterStatus, isLoading = false, defaultShowReadChaps = false }) {
  const [chapListRef, setChapListRef] = useState(null);
  const [showReadChaps, setShowReadChaps] = useState(defaultShowReadChaps);

  const { chapters } = manga;
  const chaptersToShow = showReadChaps ? chapters : chapters.filter((ch) => !ch.isRead);
  const allChaptersRead = chapters.every((chap) => chap.isRead);

  const [checkboxChange, markUpTo, markAll] = changeChapterReadStatusLogic(manga, onChangeChapterStatus);
  const markLatestChapter = () => {
    checkboxChange(getNextChapToRead(manga.chapters));
  };

  return (
    <div className="dropdown-chapter-list ant-dropdown-menu" ref={setChapListRef}>
      <Spin spinning={isLoading}>
        <Affix target={() => chapListRef}>
          <div className="btn-container">
            <Button title="Show read chapters" type="text" onClick={() => setShowReadChaps(!showReadChaps)}>
              <ClockCircleOutlined />
            </Button>

            <Button title="Mark one chapter" type="text" onClick={markLatestChapter}>
              <PlusSquareOutlined />
            </Button>

            <Popconfirm title={"Mark all as read ?"} placement="right" disabled={allChaptersRead} onConfirm={markAll}>
              <Button title="Mark chapters all as read" type="text">
                <CheckOutlined />
              </Button>
            </Popconfirm>
          </div>
        </Affix>

        <div className="chap-container">
          {chaptersToShow.length > 0 ? null : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {chaptersToShow.map((chapter) => (
            <div key={chapter.link} className="chap">
              <Checkbox checked={chapter.isRead} onChange={() => checkboxChange(chapter)} />
              <Button
                icon={<DoubleRightOutlined />}
                type="text"
                size="small"
                title="Mark all chapters up to this one as read"
                onClick={() => markUpTo(chapter)}
              />
              <a href={chapter.link} target="_blank" rel="noopener noreferrer">
                {chapter.name}
              </a>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );
}

DropdownChapterList.propTypes = {
  manga: PropTypes.object.isRequired,
  onChangeChapterStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  defaultShowReadChaps: PropTypes.bool,
};

export default DropdownChapterList;
