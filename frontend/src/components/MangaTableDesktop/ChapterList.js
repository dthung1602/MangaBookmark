import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox, Button, Tooltip, Affix } from "antd";
import { ForwardOutlined, CheckSquareOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";

function ChapterList(props) {
  const { chapters } = props;
  const [chapListRef, setChapListRef] = useState(null);
  const [showReadChaps, setShowReadChaps] = useState(props.showReadChaps);
  const [showCheckboxes, setShowCheckboxes] = useState(props.showCheckboxes);

  const chaptersToShow = showReadChaps ? chapters : chapters.filter((ch) => !ch.isRead);

  return (
    <div className="chapter-list ant-dropdown-menu" ref={setChapListRef}>
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
            <Button type="text">
              <CheckOutlined />
            </Button>
          </Tooltip>
        </div>
      </Affix>

      <div className="chap-container">
        {chaptersToShow.map((chapter) => (
          <div key={chapter._id} className="chap">
            {showCheckboxes ? <Checkbox checked={chapter.isRead} /> : null}
            <Button
              icon={<ForwardOutlined />}
              type="text"
              shape="circle-outline"
              size="small"
              title="Mark all chapters up to this one as read"
            />
            <a href={chapter.link} target="_blank" rel="noreferrer">
              {chapter.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

ChapterList.propTypes = {
  chapters: PropTypes.array,
  showReadChaps: PropTypes.bool,
  showCheckboxes: PropTypes.bool,
};

export default ChapterList;
