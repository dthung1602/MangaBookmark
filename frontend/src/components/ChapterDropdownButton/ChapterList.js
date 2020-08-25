import React, { useState } from "react";
import PropTypes from "prop-types";
import { Affix, Button, Checkbox, Empty, Popconfirm, Spin } from "antd";
import { CheckOutlined, CheckSquareOutlined, ClockCircleOutlined, DoubleRightOutlined } from "@ant-design/icons";

import { useChapterListLogic } from "../../hooks";
import "./ChapterList.less";

function ChapterList({
  manga,
  onChangeChapterStatus,
  changeChapterStatusAsync,
  defaultShowReadChaps = false,
  defaultShowCheckBoxes = false,
}) {
  const [chapListRef, setChapListRef] = useState(null);
  const [showReadChaps, setShowReadChaps] = useState(defaultShowReadChaps);
  const [showCheckboxes, setShowCheckboxes] = useState(defaultShowCheckBoxes);

  const { chapters } = manga;
  const chaptersToShow = showReadChaps ? chapters : chapters.filter((ch) => !ch.isRead);
  const allChaptersRead = chapters.every((chap) => chap.isRead);

  const [isLoading, checkboxChange, markUpTo, markAll] = useChapterListLogic(
    manga,
    onChangeChapterStatus,
    changeChapterStatusAsync,
  );

  return (
    <div className="chapter-list ant-dropdown-menu" ref={setChapListRef}>
      <Spin spinning={isLoading}>
        <Affix target={() => chapListRef}>
          <div className="btn-container">
            <Button title="Show checkbox" type="text" onClick={() => setShowCheckboxes(!showCheckboxes)}>
              <CheckSquareOutlined />
            </Button>

            <Button title="Show read chapters" type="text" onClick={() => setShowReadChaps(!showReadChaps)}>
              <ClockCircleOutlined />
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
              {showCheckboxes ? <Checkbox checked={chapter.isRead} onChange={() => checkboxChange(chapter)} /> : null}
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

ChapterList.propTypes = {
  manga: PropTypes.object.isRequired,
  onChangeChapterStatus: PropTypes.func.isRequired,
  changeChapterStatusAsync: PropTypes.bool.isRequired,
  defaultShowReadChaps: PropTypes.bool,
  defaultShowCheckBoxes: PropTypes.bool,
};

export default ChapterList;
