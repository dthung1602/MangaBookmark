import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox, Button, Tooltip, Affix, Empty, Spin } from "antd";
import { ForwardOutlined, CheckSquareOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";

import "./ChapterList.less";

function ChapterList({
  chapters,
  onCheckboxChange,
  onMarkUpTo,
  onMarkAll,
  isLoading = false,
  defaultShowReadChaps = false,
  defaultShowCheckBoxes = false,
}) {
  const [chapListRef, setChapListRef] = useState(null);
  const [showReadChaps, setShowReadChaps] = useState(defaultShowReadChaps);
  const [showCheckboxes, setShowCheckboxes] = useState(defaultShowCheckBoxes);

  const chaptersToShow = showReadChaps ? chapters : chapters.filter((ch) => !ch.isRead);

  return (
    <div className="chapter-list ant-dropdown-menu" ref={setChapListRef}>
      <Spin spinning={isLoading}>
        <Affix target={() => chapListRef}>
          <div className="btn-container">
            <Tooltip title="Show checkbox">
              <Button type="text" onClick={() => setShowCheckboxes(!showCheckboxes)}>
                <CheckSquareOutlined />
              </Button>
            </Tooltip>

            <Tooltip title="Show read chapters">
              <Button type="text" onClick={() => setShowReadChaps(!showReadChaps)}>
                <ClockCircleOutlined />
              </Button>
            </Tooltip>

            <Tooltip title="Mark chapters all as read">
              <Button type="text" onClick={onMarkAll}>
                <CheckOutlined />
              </Button>
            </Tooltip>
          </div>
        </Affix>

        <div className="chap-container">
          {chaptersToShow.length > 0 ? null : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {chaptersToShow.map((chapter) => (
            <div key={chapter.link} className="chap">
              {showCheckboxes ? <Checkbox checked={chapter.isRead} onChange={() => onCheckboxChange(chapter)} /> : null}
              <Button
                icon={<ForwardOutlined />}
                type="text"
                shape="circle-outline"
                size="small"
                title="Mark all chapters up to this one as read"
                onClick={() => onMarkUpTo(chapter)}
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
  chapters: PropTypes.array.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onMarkUpTo: PropTypes.func.isRequired,
  onMarkAll: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  defaultShowReadChaps: PropTypes.bool,
  defaultShowCheckBoxes: PropTypes.bool,
};

export default ChapterList;
