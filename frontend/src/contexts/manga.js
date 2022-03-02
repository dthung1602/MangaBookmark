import { createContext } from "react";

import { doNothing } from "../utils";

const initContext = {
  manga: null,
  setManga: doNothing,
  isLoading: false,
  errors: [],
  setErrors: doNothing,

  nextChapToRead: null,
  nextChapToReadIdx: -1,

  editMangaField: doNothing,
  updateManga: doNothing,
  deleteManga: doNothing,

  isMarkingChapters: false,
  markOne: doNothing,
  markUpTo: doNothing,
  markAll: doNothing,
  disableMarkAll: false,
};

const MangaContext = createContext(initContext);

export default MangaContext;
