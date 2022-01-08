import { ROUTE_MANGA_DETAIL, ROUTE_SEARCH } from "./constants";

export const buildMangaDetailRoute = (mangaId) => {
  return ROUTE_MANGA_DETAIL + "?id=" + mangaId;
};

export const buildSearchRoute = (term) => {
  const searchParams = new URLSearchParams({ term });
  return ROUTE_SEARCH + "?" + searchParams;
};
