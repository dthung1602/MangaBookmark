import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { MangaSiteLink, MangaStatus } from "../../../components";
import { buildMangaDetailPath } from "../../../utils";

import "./OmniSearchResult.less";

const OmniSearchResult = ({ userMangas }) => {
  return (
    <div className="omnisearch-result">
      <div key="header-user-mangas" className="omnisearch-content-header">
        From your library
      </div>
      {userMangas.map((result) => {
        const content = (
          <div className="omnisearch-content">
            <div className="omnisearch-cover">
              <img src={result.image} alt={result.name} />
            </div>
            <div className="omnisearch-info">
              <div className="omnisearch-name">{result.name}</div>
              <div className="omnisearch-short-description">
                <MangaStatus status={result.attributes.status} />
                <span>
                  <b>Shelf:</b> {result.attributes.shelf}
                </span>
              </div>
              <div className="omnisearch-long-description">
                <MangaStatus status={result.attributes.status} />
                <span>
                  <b>Site:</b>&nbsp;&nbsp;
                  <MangaSiteLink mangaSiteName={result.attributes.site} />
                </span>
                <span>
                  <b>Shelf:</b> {result.attributes.shelf}
                </span>
              </div>
            </div>
          </div>
        );

        return (
          <div key={result._id} className="omnisearch-result-row">
            {result.type === "user-manga" ? (
              <Link to={buildMangaDetailPath(result)}>{content}</Link>
            ) : (
              <a href={result.attributes.link}>{content}</a>
            )}
          </div>
        );
      })}
    </div>
  );
};

OmniSearchResult.propTypes = {
  userMangas: PropTypes.array.isRequired,
};

export default OmniSearchResult;
