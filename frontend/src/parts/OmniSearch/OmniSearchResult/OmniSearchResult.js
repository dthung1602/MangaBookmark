import PropTypes from "prop-types";
import { Spin } from "antd";

import OmniSearchResultUserMangaRow from "../OmniSearchResultUserMangaRow";
import OmniSearchResultScanlationMangaRow from "../OmniSearchResultScanlationMangaRow";
import "./OmniSearchResult.less";

const placeholder = (
  <div className="omnisearch-result-row-placeholder">
    <Spin />
  </div>
);

const OmniSearchResult = ({ searchContext }) => {
  const { userMangas, isLoadingUserMangas, scanlationMangas, isLoadingScanlationMangas } = searchContext;

  return (
    <div className="omnisearch-result">
      <div key="header-user-mangas" className="omnisearch-content-header">
        From your library
      </div>
      {isLoadingUserMangas ? placeholder : null}
      {userMangas.map((result) => (
        <OmniSearchResultUserMangaRow key={result._id} result={result} />
      ))}
      <div key="header-scanlation-mangas" className="omnisearch-content-header">
        From scanlation sites
      </div>
      {isLoadingScanlationMangas ? placeholder : null}
      {scanlationMangas.map((result) => (
        <OmniSearchResultScanlationMangaRow key={result._id} result={result} />
      ))}
    </div>
  );
};

OmniSearchResult.propTypes = {
  searchContext: PropTypes.object.isRequired,
};

export default OmniSearchResult;
