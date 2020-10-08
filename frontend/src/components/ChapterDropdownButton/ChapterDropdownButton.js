import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "antd";

import DropdownChapterList from "./DropdownChapterList";
import { getNextChapToRead } from "../../utils/chapters";
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
  const [nextChapToRead] = getNextChapToRead(chapters);

  return (
    <Dropdown.Button
      size={size}
      overlay={
        <DropdownChapterList
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
