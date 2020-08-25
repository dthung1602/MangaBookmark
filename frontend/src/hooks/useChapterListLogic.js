import { useState } from "react";

const useChapterListLogic = (manga, onChangeChapterStatus, changeChapterStatusAsync) => {
  const [isLoading, setIsLoading] = useState(false);

  const onChangeChapterStatusWrapper = (isRead, chaps) => {
    if (changeChapterStatusAsync) {
      setIsLoading(true);
    }
    const result = onChangeChapterStatus(manga._id, isRead, chaps);
    if (changeChapterStatusAsync) {
      result.finally(() => setIsLoading(false));
    }
  };

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

  return [isLoading, checkboxChange, markUpTo, markAll];
};

export default useChapterListLogic;
