import { ROUTE_MANGA_DETAIL, ROUTE_SEARCH, ROUTE_ALL_MANGAS } from "./constants";

export const buildMangaDetailRoute = (mangaId) => {
  return ROUTE_MANGA_DETAIL + "?id=" + mangaId;
};

export const buildSearchRoute = (term) => {
  const searchParams = new URLSearchParams({ term });
  return ROUTE_SEARCH + "?" + searchParams;
};

export const buildAllMangasRoute = (filters) => {
  const searchParams = new URLSearchParams(filters);
  return ROUTE_ALL_MANGAS + "?" + searchParams;
};
