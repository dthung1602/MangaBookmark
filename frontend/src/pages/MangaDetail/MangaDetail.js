import { useCallback } from "react";
import { Spin } from "antd";
import { useQueryParam } from "use-query-params";

import PageLayout from "../PageLayout";
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

  return (
    <MangaContext.Provider value={mangaContext}>
      <PageLayout>
        {mangaContext.isLoading ? (
          <Spin />
        ) : (
          <div className="manga-detail">
            <MangaBanner />
            <MangaDetailLeftPanel />
            <MangaDetailRightPanel />
          </div>
        )}
      </PageLayout>
    </MangaContext.Provider>
  );
};

export default MangaDetail;
