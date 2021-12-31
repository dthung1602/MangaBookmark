import { createContext } from "react";

import { doNothing } from "../utils";

const initContext = {
  mangas: [],
  setMangas: doNothing,
  isLoading: false,

  loadMode: "replace",
  allLoaded: false,
  totalFound: NaN,

  showHidden: false,
  setShowHidden: doNothing,
  mangasToShow: [],

  onMangaClicked: doNothing,

  addMangaDone: doNothing,
  editMangaDone: doNothing,
  updateMangaDone: doNothing,
  markChaptersDone: doNothing,
  deleteMangaDone: doNothing,
};

const MangaListContext = createContext(initContext);

export default MangaListContext;
