import React from "react";
import PropTypes from "prop-types";

import NextChapButton from "../NextChapButton";
import { useMarkChapterAPI } from "../../../hooks";
import { changeChapterReadStatusLogic, getNextChapToRead } from "../../../utils/chapters";
import "./MangaQuickActions.less";

const MangaQuickActions = ({ manga, updateMangaDone }) => {
  const onChangeChapterStatus = useMarkChapterAPI(updateMangaDone)[1];
  const nextChapToRead = getNextChapToRead(manga.chapters)[0];
  const markOne = changeChapterReadStatusLogic(manga, onChangeChapterStatus)[0];

  return (
    <div className="quick-actions">
      <NextChapButton nextChapToRead={nextChapToRead} markOne={markOne} />
    </div>
  );
};

MangaQuickActions.propTypes = {
  manga: PropTypes.object.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
};

export default MangaQuickActions;
