import { createContext } from "react";

const doNothing = () => {};

const initContext = {
  mangas: [],
  setMangas: doNothing,
  isLoading: false,
  totalFound: NaN,

  showHidden: false,
  setShowHidden: doNothing,
  mangasToShow: [],

  onMangaClicked: doNothing,

  addMangaDone: doNothing,
  editMangaDone: doNothing,
  updateMangaDone: doNothing,
  deleteMangaDone: doNothing,
};

const MangaListContext = createContext(initContext);

export default MangaListContext;
