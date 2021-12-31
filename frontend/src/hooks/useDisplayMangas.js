import { useContext, useMemo } from "react";

import { MANGA_PER_PAGE } from "../utils/constants";
import { clonePlainObject } from "../utils";
import { MangaListContext } from "../contexts";

const skeletonData = Array(MANGA_PER_PAGE).fill({ isSkeleton: true });

const useDisplayMangas = () => {
  const { isLoading, mangasToShow } = useContext(MangaListContext);

  const dataSource = useMemo(
    () =>
      clonePlainObject(
        isLoading === "replace"
          ? skeletonData
          : isLoading === "append"
          ? [...mangasToShow, ...skeletonData]
          : mangasToShow,
      ),
    [mangasToShow, isLoading],
  );

  return dataSource;
};

export default useDisplayMangas;
