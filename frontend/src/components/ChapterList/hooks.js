import { useEffect, useState } from "react";

import { getNextChapPage, getNextChapToRead } from "../../utils/chapters";
import { REREAD, RIGHT_PANEL_TABLE_PAGE_SIZE } from "../../utils/constants";
import { clonePlainObject } from "../../utils";

const usePagination = (manga, chapters) => {
  // TODO? move next chap to read to manga context?
  const nextChapIdx = getNextChapToRead(manga)[1];
  const nextChapPage = getNextChapPage(chapters, nextChapIdx);

  const [pagination, setPagination] = useState({
    hideOnSinglePage: true,
    current: nextChapPage,
    showSizeChanger: false,
    defaultPageSize: RIGHT_PANEL_TABLE_PAGE_SIZE,
  });

  useEffect(() => {
    const nextChapIdx = getNextChapToRead(manga)[1];
    const currentPage = getNextChapPage(chapters, nextChapIdx);
    setPagination({ ...pagination, current: currentPage });
  }, [manga]);

  const onPageChange = (newPage) => {
    setPagination({ ...pagination, current: newPage });
  };

  return { pagination, onPageChange };
};

const filterDisplayChapters = (manga, showReadChapters) => {
  let { chapters, nextRereadChapter, shelf } = manga;

  if (shelf === REREAD) {
    chapters = clonePlainObject(chapters);
    let reachedNextRereadChapter = Boolean(nextRereadChapter);
    for (let chap of chapters) {
      chap.isRead = reachedNextRereadChapter; // remember, chapters are in reversed order!
      reachedNextRereadChapter = reachedNextRereadChapter || chap.link === nextRereadChapter.link;
    }
  }

  return showReadChapters ? chapters : chapters.filter((ch) => !ch.isRead);
};

const useShowChapters = (manga, chapters) => {
  const [showReadChapters, setShowReadChapters] = useState(true);

  const chaptersToShow = filterDisplayChapters(manga, showReadChapters);
  const toggleShowReadChapters = () => setShowReadChapters(!showReadChapters);

  useEffect(() => setShowReadChapters(true), [chapters]);

  return { chaptersToShow, showReadChapters, toggleShowReadChapters };
};

export { usePagination, useShowChapters };
