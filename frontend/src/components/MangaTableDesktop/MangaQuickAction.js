import React from "react";
import { Dropdown } from "antd";

import ChapterList from "./ChapterList";
import { truncString } from "../../utils";

const MAX_LEN_CHAP_NAME = 25;

function QuickAction(manga) {
  const { chapters } = manga;

  let nextChapToRead = {
    name: <i>Last chap reached</i>,
    link: chapters[0].link,
  };
  for (let i = 0; i < chapters.length - 1; i++) {
    if (!chapters[i].isRead && chapters[i + 1].isRead) {
      nextChapToRead = chapters[i];
      break;
    }
  }
  if (nextChapToRead === undefined && !chapters[chapters.length - 1].isRead) {
    nextChapToRead = chapters[chapters.length - 1];
  }

  return (
    <>
      <Dropdown.Button overlay={<ChapterList chapters={chapters} />}>
        <a href={nextChapToRead.link} target="_blank" rel="noopener noreferrer">
          {truncString(nextChapToRead.name, MAX_LEN_CHAP_NAME)}
        </a>
      </Dropdown.Button>
    </>
  );
}

export default QuickAction;
