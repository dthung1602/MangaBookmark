import { useCallback } from "react";
import { Spin } from "antd";
import { useQueryParam } from "use-query-params";

import PageLayout from "../PageLayout";
import MangaDetailLeftPanel from "../../components/MangaDetailLeftPanel";
import MangaBanner from "../../components/MangaBanner";
import { MangaContext } from "../../contexts";
import { useMangaContext } from "../../hooks";
import { MangaAPI } from "../../api";
import "./MangaDetail.less";

let dummyText =
  "skdfjaskd klasj dflk ajslkdf jklas dklf jaslkd sdfflkasd ;aksdj ;flakjsdfioajs skdfjaskd klasj dflk\n" +
  "ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajs skdfjaskd klasj dflk ajslkdf jklas dklf jaslkd\n" +
  "flkasd ;aksdj ;flakjsdfioajs skdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj";

for (let i = 0; i < 5; i++) {
  dummyText += dummyText;
}

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
            <div className="manga-detail-right-panel">{dummyText}</div>
          </div>
        )}
      </PageLayout>
    </MangaContext.Provider>
  );
};

export default MangaDetail;
