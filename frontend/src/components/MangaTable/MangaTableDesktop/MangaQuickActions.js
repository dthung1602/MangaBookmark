import React from "react";
import PropTypes from "prop-types";

import { useMarkChapterAPI } from "../../../hooks";
import ChapterDropdownButton from "../../ChapterDropdownButton";

const MangaQuickActions = ({ manga, updateMangaDone }) => {
  const [isLoading, markChapters] = useMarkChapterAPI(updateMangaDone);

  return <ChapterDropdownButton onChangeChapterStatus={markChapters} isLoading={isLoading} manga={manga} />;
};

MangaQuickActions.propTypes = {
  manga: PropTypes.object.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
};

export default MangaQuickActions;
