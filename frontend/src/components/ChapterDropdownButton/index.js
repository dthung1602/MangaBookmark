import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "antd";

import ChapterList from "./ChapterList";
import { truncString } from "../../utils";
import "./ChapterDropdownButton.less";

const MAX_LEN_CHAP_NAME = 25;

function ChapterDropdownButton({
  chapters,
  onChangeReadStatus,
  defaultShowReadChaps = false,
  defaultShowCheckBoxes = false,
  size = "middle",
}) {
  let nextChapToRead;
  for (let i = 0; i < chapters.length - 1; i++) {
    if (!chapters[i].isRead && chapters[i + 1].isRead) {
      nextChapToRead = chapters[i];
      break;
    }
  }
  if (nextChapToRead === undefined) {
    if (!chapters[chapters.length - 1].isRead) {
      nextChapToRead = chapters[chapters.length - 1];
    } else {
      nextChapToRead = {
        name: <i>Last chap reached</i>,
        link: chapters[0].link,
      };
    }
  }

  const checkboxChange = (chapter) => {
    onChangeReadStatus(!chapter.isRead, [chapter.link]);
  };

  const markUpTo = (chapter) => {
    const idx = chapters.indexOf(chapter);
    const chapsToMark = chapters.filter((ch, i) => i >= idx && !ch.isRead).map((ch) => ch.link);
    onChangeReadStatus(true, chapsToMark);
  };

  const markALl = () => {
    const chapsToMark = chapters.filter((ch) => !ch.isRead).map((ch) => ch.link);
    onChangeReadStatus(true, chapsToMark);
  };

  return (
    <Dropdown.Button
      size={size}
      overlay={
        <ChapterList
          chapters={chapters}
          defaultShowReadChaps={defaultShowReadChaps}
          defaultShowCheckBoxes={defaultShowCheckBoxes}
          onCheckboxChange={checkboxChange}
          onMarkUpTo={markUpTo}
          onMarkAll={markALl}
        />
      }
    >
      <a href={nextChapToRead.link} title={`Read "${nextChapToRead.name}"`} target="_blank" rel="noopener noreferrer">
        {truncString(nextChapToRead.name, MAX_LEN_CHAP_NAME)}
      </a>
    </Dropdown.Button>
  );
}

ChapterDropdownButton.propTypes = {
  chapters: PropTypes.array.isRequired,
  onChangeReadStatus: PropTypes.func.isRequired,
  defaultShowReadChaps: PropTypes.bool,
  defaultShowCheckBoxes: PropTypes.bool,
  size: PropTypes.string,
};

export default ChapterDropdownButton;
