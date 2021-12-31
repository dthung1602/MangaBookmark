import { RIGHT_PANEL_TABLE_PAGE_SIZE, REREAD } from "./constants";

const doNothing = () => {};

export const markChapterLogic = (manga, onChangeChapterStatus) => {
  if (manga === null) {
    return [doNothing, doNothing, doNothing];
  }
  return manga.shelf === REREAD
    ? updateRereadProgressLogic(manga, onChangeChapterStatus)
    : updateChapterReadStatusLogic(manga, onChangeChapterStatus);
};

const updateRereadProgressLogic = (manga, onChangeChapterStatus) => {
  const checkboxChange = (chapter) => {
    let nextRereadChapterLink;
    if (!chapter.isRead) {
      const idx = manga.chapters.findIndex((ch) => ch.link === chapter.link) - 1;
      nextRereadChapterLink = idx === -1 ? "" : manga.chapters[idx].link;
    } else {
      nextRereadChapterLink = chapter.link;
    }
    onChangeChapterStatus(manga, !chapter.isRead, [nextRereadChapterLink]);
  };

  const markUpTo = checkboxChange;

  const markAll = () => {
    onChangeChapterStatus(manga, true, [""]);
  };

  return [checkboxChange, markUpTo, markAll];
};

const updateChapterReadStatusLogic = (manga, onChangeChapterStatus) => {
  const checkboxChange = (chapter) => {
    onChangeChapterStatus(manga, !chapter.isRead, [chapter.link]);
  };

  const markUpTo = (chapter) => {
    const idx = manga.chapters.indexOf(chapter);
    const chapsToMark = manga.chapters.filter((ch, i) => i >= idx && !ch.isRead).map((ch) => ch.link);
    onChangeChapterStatus(manga, true, chapsToMark);
  };

  const markAll = () => {
    const chapsToMark = manga.chapters.filter((ch) => !ch.isRead).map((ch) => ch.link);
    onChangeChapterStatus(manga, true, chapsToMark);
  };

  return [checkboxChange, markUpTo, markAll];
};

export const getNextChapToRead = (manga) => {
  if (manga === null || manga === undefined) {
    return [{}, -1];
  }

  const { shelf, chapters, nextRereadChapter } = manga;

  if (shelf === REREAD) {
    if (!nextRereadChapter) {
      return [{}, -1];
    }
    return [
      {
        empty: false,
        name: nextRereadChapter.name,
        link: nextRereadChapter.link,
      },
      chapters.findIndex((ch) => ch.link === nextRereadChapter.link),
    ];
  }

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
