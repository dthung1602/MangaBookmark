import PropTypes from "prop-types";

import NextChapButton from "../NextChapButton";
import MarkAllButton from "../MarkAllButton";
import { useMangaContext } from "../../../hooks";
import { doNothing } from "../../../utils";
import "./QuickActions.less";

const QuickActions = ({ manga, updateMangaDone }) => {
  const { markAll, markOne, isMarkingChapters, nextChapToRead, disableMarkAll } = useMangaContext(
    manga,
    doNothing,
    updateMangaDone,
    updateMangaDone,
    doNothing,
  );

  return (
    <div className="quick-actions">
      <MarkAllButton isLoading={isMarkingChapters} disabled={disableMarkAll} markAll={markAll} />
      <NextChapButton nextChapToRead={nextChapToRead} markOne={markOne} />
    </div>
  );
};

QuickActions.propTypes = {
  manga: PropTypes.object.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
};

export default QuickActions;
