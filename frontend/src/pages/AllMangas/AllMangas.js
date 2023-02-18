import { useCallback, useState } from "react";

import { ArrayParam, StringParam, useQueryParams, withDefault } from "use-query-params";

import MangaListingLayout from "../MangaListingLayout";
import { MangaFilters } from "../../components";
import { MangaAPI } from "../../api";
import { ANY, MANGA_PER_PAGE, SORT_DEC_STATUS } from "../../utils/constants";
import { removeEmptyStringAttrs, removeUndefinedAttrs } from "../../utils";

const AllMangas = () => {
  const [page, setPage] = useState(1);

  // FIXME when scroll 2 fast + high res screen
  const increasePage = useCallback(() => setPage(page + 1), [page]);
  const loadMode = page === 1 ? "replace" : "append";

  const [filters, setFilters] = useQueryParams({
    shelf: withDefault(StringParam, ANY),
    status: withDefault(StringParam, ANY),
    sort: withDefault(StringParam, SORT_DEC_STATUS),
    search: StringParam,
    isCompleted: withDefault(StringParam, ANY),
    hidden: withDefault(StringParam, "false"),
    site: withDefault(StringParam, ANY),
    lang: withDefault(StringParam, ANY),
    tags: withDefault(ArrayParam, []),
    createdAtGTE: StringParam,
    createdAtLTE: StringParam,
    lastReleasedGTE: StringParam,
    lastReleasedLTE: StringParam,
  });

  document.title = "All mangas | MangaBookmark";

  const loadMangas = useCallback(() => MangaAPI.find({ ...filters, page, perPage: MANGA_PER_PAGE }), [filters, page]);

  const updateFilters = (values) => {
    const newFilters = { ...filters, ...values };
    removeEmptyStringAttrs(newFilters);
    removeUndefinedAttrs(newFilters);
    setFilters(newFilters, "push");
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(
      {
        shelf: undefined,
        status: undefined,
        sort: undefined,
        search: undefined,
        isCompleted: undefined,
        hidden: "false",
        site: undefined,
        lang: undefined,
        tags: [],
        createdAtGTE: undefined,
        createdAtLTE: undefined,
        lastReleasedGTE: undefined,
        lastReleasedLTE: undefined,
      },
      "push",
    );
    setPage(1);
  };

  const filterBar = <MangaFilters filters={filters} updateFilters={updateFilters} resetFilters={resetFilters} />;

  return (
    <MangaListingLayout
      title="All mangas"
      mangasOrFactory={loadMangas}
      loadMode={loadMode}
      filterNode={filterBar}
      updateMangaFilters={filters}
      updateButtonText="Update matched mangas"
      onReachedEndOfList={increasePage}
    />
  );
};

export default AllMangas;
