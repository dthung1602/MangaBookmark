import PropTypes from "prop-types";
import { Spin, Empty } from "antd";

import OmniSearchResultUserMangaRow from "../OmniSearchResultUserMangaRow";
import OmniSearchResultScanlationMangaRow from "../OmniSearchResultScanlationMangaRow";
import "./OmniSearchResult.less";

const loadingPlaceholder = (
  <div className="omnisearch-result-row-placeholder">
    <Spin />
  </div>
);

const emptyPlaceholder = (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing found" className="omnisearch-result-row-empty" />
);

const OmniSearchResult = ({ searchContext }) => {
  const { userMangas, isLoadingUserMangas, scanlationMangas, isLoadingScanlationMangas } = searchContext;

  return (
    <div className="omnisearch-result">
      <div key="header-user-mangas" className="omnisearch-content-header">
        From your library
      </div>
      {isLoadingUserMangas ? loadingPlaceholder : null}
      {userMangas.map((result, index) => (
        <OmniSearchResultUserMangaRow key={`user-manga-${index}`} result={result} />
      ))}
      {userMangas.length === 0 && !isLoadingUserMangas ? emptyPlaceholder : null}
      <div key="header-scanlation-mangas" className="omnisearch-content-header">
        From scanlation sites
      </div>
      {isLoadingScanlationMangas ? loadingPlaceholder : null}
      {scanlationMangas.map((result, index) => (
        <OmniSearchResultScanlationMangaRow key={`scanlation-manga-${index}`} result={result} />
      ))}
      {scanlationMangas.length === 0 && !isLoadingScanlationMangas ? emptyPlaceholder : null}
    </div>
  );
};

OmniSearchResult.propTypes = {
  searchContext: PropTypes.object.isRequired,
};

export default OmniSearchResult;
