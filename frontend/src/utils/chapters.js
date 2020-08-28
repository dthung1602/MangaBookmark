import React from "react";

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
    return {};
  }
  if (chapters.length === 0) {
    return {
      empty: true,
      name: <i>No chapter found</i>,
      link: "#",
    };
  }

  let nextChapToRead = {
    empty: true,
    name: <i>Last chap reached</i>,
    link: chapters[0].link,
  };
  for (let i = 0; i < chapters.length - 1; i++) {
    if (!chapters[i].isRead && chapters[i + 1].isRead) {
      nextChapToRead = chapters[i];
      break;
    }
  }
  if (nextChapToRead.empty && !chapters[chapters.length - 1].isRead) {
    nextChapToRead = chapters[chapters.length - 1];
  }
  return nextChapToRead;
};
