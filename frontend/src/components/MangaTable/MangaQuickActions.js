import PropTypes from "prop-types";

import NextChapButton from "./NextChapButton";
import MarkAllButton from "./MarkAllButton";
import { useMarkChapterAPI } from "../../hooks";
import { markChapterLogic, getNextChapToRead } from "../../utils/chapters";
import "./MangaQuickActions.less";

const MangaQuickActions = ({ manga, updateMangaDone }) => {
  const [isChapterLoading, onChangeChapterStatus] = useMarkChapterAPI(updateMangaDone);
  const [nextChapToRead] = getNextChapToRead(manga);
  // eslint-disable-next-line no-unused-vars
  const [markOne, _, markAll] = markChapterLogic(manga, onChangeChapterStatus);
  const allRead = manga.chapters.every((ch) => ch.isRead);

  return (
    <div className="manga-quick-actions">
      <MarkAllButton isLoading={isChapterLoading} disabled={allRead} markAll={markAll} />
      <NextChapButton nextChapToRead={nextChapToRead} markOne={markOne} />
    </div>
  );
};

MangaQuickActions.propTypes = {
  manga: PropTypes.object.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
};

export default MangaQuickActions;
