import React from "react";
import PropTypes from "prop-types";

import { useMarkChapterAPI } from "../../../hooks";
import ChapterDropdownButton from "../../ChapterDropdownButton";

const MangaQuickActions = ({ manga, updateMangaDone }) => {
  const onChangeChapterStatus = useMarkChapterAPI(updateMangaDone);

  return (
    <ChapterDropdownButton
      manga={manga}
      onChangeChapterStatus={onChangeChapterStatus}
      changeChapterStatusAsync={true}
    />
  );
};

MangaQuickActions.propTypes = {
  manga: PropTypes.object.isRequired,
  updateMangaDone: PropTypes.func.isRequired,
};

export default MangaQuickActions;
