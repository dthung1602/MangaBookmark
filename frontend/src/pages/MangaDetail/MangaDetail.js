import { useCallback } from "react";
import { Spin } from "antd";
import { useQueryParam } from "use-query-params";

import PageLayout from "../PageLayout";
import { MangaDetailLeftPanel, MangaDetailRightPanel } from "../../parts";
import MangaBanner from "../../components/MangaBanner";
import { MangaContext } from "../../contexts";
import { useMangaContext } from "../../hooks";
import { MangaAPI } from "../../api";
import "./MangaDetail.less";

const MangaDetail = () => {
  const [mangaId] = useQueryParam("id");
  const loadManga = useCallback(() => MangaAPI.get(mangaId), [mangaId]);
  const mangaContext = useMangaContext(loadManga);

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
