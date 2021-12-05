import { useEffect, useState } from "react";
import { useQueryParam } from "use-query-params";
import { Spin } from "antd";

import { MangaAPI } from "../../api";
import PageLayout from "../PageLayout";
import { notifyError, throwOnCriticalErrors } from "../../utils/error-handler";

const MangaDetail = () => {
  const [mangaId] = useQueryParam("id");
  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const { result, abort } = MangaAPI.get(mangaId);

    result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        setManga(await response.json());
        setIsLoading(false);
      })
      .catch((e) => {
        // silently ignore AbortError while report others
        // if a request is aborted => another is being made => loading = true
        if (e.name !== "AbortError") {
          notifyError(e);
        }
      });

    return () => abort();
  }, [mangaId]);

  return (
    <PageLayout>
      {isLoading ? (
        <Spin />
      ) : (
        <div>
          <img alt={manga.name} src={manga.image} />
          <h2>{manga.name}</h2>
        </div>
      )}
    </PageLayout>
  );
};

export default MangaDetail;
