import { createContext } from "react";

const initContext = {
  manga: null,
  setManga: () => {},
  nextChapToRead: null,
  isLoading: false,

  editMangaField: () => {},
  updateManga: () => {},
  deleteManga: () => {},

  isMarkingChapters: false,
  markOne: () => {},
  markUpTo: () => {},
  markAll: () => {},
  disableMarkAll: false,
};

const MangaContext = createContext(initContext);

export default MangaContext;
