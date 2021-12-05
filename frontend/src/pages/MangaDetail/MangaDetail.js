import { useEffect, useState } from "react";

import { useQueryParam } from "use-query-params";
import { Spin } from "antd";

import PageLayout from "../PageLayout";
import MangaDetailLeftPanel from "../../components/MangaDetailLeftPanel";
import MangaBanner from "../../components/MangaBanner";
import { MangaAPI } from "../../api";
import { notifyError, throwOnCriticalErrors } from "../../utils/error-handler";
import "./MangaDetail.less";

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
        <div className="manga-detail">
          <MangaBanner manga={manga} />
          <MangaDetailLeftPanel manga={manga} />
          <div className="manga-detail-right-panel">
            skdfjaskd klasj dflk ajslkdf jklas dklf jaslkd sdfflkasd ;aksdj ;flakjsdfioajs skdfjaskd klasj dflk ajslkdf
            jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajs skdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;sdfsdflakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf
            jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas sdfsdklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflksadf f sdfsd ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flaksadf f sdfsd ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flaksadf f sdfsd ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flaksadf f sdfsd ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flaksadf f sdfsd ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtgklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj
            ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj
            dflk ajslkdf jklas dklf jaslkd flkasd ;aksdj ;flakjsdfioajsskdfjaskd klasj dflk ajslkdf jklas dklf jaslkd
            flkasd ;aksdj ;flakjsdfioajs asd dsadofpoaewf wi qwdioqwdj qwkdoiqw dqwdiojq wl qw iwxscgas ca wef waef
            agergerhrtjrtg
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default MangaDetail;
