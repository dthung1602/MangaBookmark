import React from "react";
import { RIGHT_PANEL_TABLE_PAGE_SIZE } from "./constants";

export const changeChapterReadStatusLogic = (manga, onChangeChapterStatus) => {
  const onChangeChapterStatusWrapper = (isRead, chaps) => onChangeChapterStatus(manga._id, isRead, chaps);

  const checkboxChange = (chapter) => {
    onChangeChapterStatusWrapper(!chapter.isRead, [chapter.link]);
  };

  const markUpTo = (chapter) => {
    const idx = manga.chapters.indexOf(chapter);
    const chapsToMark = manga.chapters.filter((ch, i) => i >= idx && !ch.isRead).map((ch) => ch.link);
    onChangeChapterStatusWrapper(true, chapsToMark);
  };

  const markAll = () => {
    const chapsToMark = manga.chapters.filter((ch) => !ch.isRead).map((ch) => ch.link);
    onChangeChapterStatusWrapper(true, chapsToMark);
  };

  return [checkboxChange, markUpTo, markAll];
};

export const getNextChapToRead = (chapters) => {
  if (!chapters) {
    return [{}, -1];
  }
  if (chapters.length === 0) {
    return [
      {
        empty: true,
        name: <i>No chapter found</i>,
        link: "#",
      },
      -1,
    ];
  }

  let nextChapToRead = {
    empty: true,
    name: <i>Last chap reached</i>,
    link: chapters[0].link,
  };
  let lastChapIdx = -1;
  for (let i = 0; i < chapters.length - 1; i++) {
    if (!chapters[i].isRead && chapters[i + 1].isRead) {
      nextChapToRead = chapters[i];
      lastChapIdx = i;
      break;
    }
  }
  if (nextChapToRead.empty && !chapters[chapters.length - 1].isRead) {
    lastChapIdx = chapters.length - 1;
    nextChapToRead = chapters[lastChapIdx];
  }
  return [nextChapToRead, lastChapIdx];
};

export const getNextChapPage = (chapters, nextChapIdx) => {
  return nextChapIdx === -1 ? 1 : Math.ceil((nextChapIdx + 1) / RIGHT_PANEL_TABLE_PAGE_SIZE);
};
