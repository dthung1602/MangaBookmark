const chapterListLogic = (manga, onChangeChapterStatus) => {
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

export default chapterListLogic;
