import { useCallback } from "react";

import { Spin } from "antd";
import { useQueryParam } from "use-query-params";

import DefaultLayout from "../DefaultLayout";
import { MangaBanner } from "../../components";
import { MangaDetailLeftPanel, MangaDetailRightPanel } from "../../parts";
import { MangaContext } from "../../contexts";
import { useMangaAPIContext } from "../../hooks";
import { MangaAPI } from "../../api";
import "./MangaDetail.less";

const MangaDetail = () => {
  const [mangaId] = useQueryParam("id");
  const loadManga = useCallback(() => MangaAPI.get(mangaId), [mangaId]);
  const mangaContext = useMangaAPIContext(loadManga);

  document.title = "Manga detail | MangaBookmark";

  return (
    <MangaContext.Provider value={mangaContext}>
      <DefaultLayout>
        {mangaContext.isLoading ? (
          <Spin />
        ) : (
          <div>
            <MangaBanner />
            <MangaDetailLeftPanel />
            <MangaDetailRightPanel />
          </div>
        )}
      </DefaultLayout>
    </MangaContext.Provider>
  );
};

export default MangaDetail;
