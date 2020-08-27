import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "antd";

import ChapterList from "./ChapterList";
import { truncString } from "../../utils";

const MAX_LEN_CHAP_NAME = 25;

function ChapterDropdownButton({
  manga,
  onChangeChapterStatus,
  isLoading = false,
  defaultShowReadChaps = false,
  defaultShowCheckBoxes = false,
  size = "middle",
}) {
  const { chapters } = manga;
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

  return (
    <Dropdown.Button
      size={size}
      overlay={
        <ChapterList
          manga={manga}
          onChangeChapterStatus={onChangeChapterStatus}
          isLoading={isLoading}
          defaultShowReadChaps={defaultShowReadChaps}
          defaultShowCheckBoxes={defaultShowCheckBoxes}
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
  manga: PropTypes.object.isRequired,
  onChangeChapterStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  defaultShowReadChaps: PropTypes.bool,
  defaultShowCheckBoxes: PropTypes.bool,
  size: PropTypes.string,
};

export default ChapterDropdownButton;
