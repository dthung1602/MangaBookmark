import { useCallback } from "react";

import { useQueryParam } from "use-query-params";

import DefaultLayout from "../DefaultLayout";
import { MangaBanner } from "../../components";
import { Desktop, Mobile } from "../../components/ScreenSize";
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
        <Desktop
          render={() => (
            <>
              <MangaBanner />
              <MangaDetailLeftPanel />
              <MangaDetailRightPanel />
            </>
          )}
        />
        <Mobile
          render={() => (
            <>
              <MangaBanner />
              <MangaDetailRightPanel />
            </>
          )}
        />
      </DefaultLayout>
    </MangaContext.Provider>
  );
};

export default MangaDetail;
