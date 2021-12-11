import { createContext } from "react";

const initContext = {
  manga: null,
  setManga: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isMarkingChapters: false,
  markChapters: () => {},
};

const MangaContext = createContext(initContext);

export default MangaContext;
