import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Row, Col, Spin } from "antd";

import { MangaSiteLink, MangaStatus } from "../../../components";
import { buildMangaDetailPath, formatDate, truncString } from "../../../utils";
import "./OmniSearchResult.less";

const placeholder = (
  <div className="omnisearch-result-row-placeholder">
    <Spin />
  </div>
);

const OmniSearchResult = ({ userMangas, isLoadingUserMangas }) => {
  return (
    <div className="omnisearch-result">
      <div key="header-user-mangas" className="omnisearch-content-header">
        From your library
      </div>
      {isLoadingUserMangas ? placeholder : null}
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
                <MangaSiteLink mangaSiteName={result.attributes.site} />
              </div>
              <Row className="omnisearch-long-description" gutter={[0, 4]}>
                <Col span={10}>
                  <b>Shelf:</b> {result.attributes.shelf}
                </Col>
                <Col span={14}>
                  <b>Author:</b> {result.attributes.authors.join("-")}
                </Col>
                <Col span={24}>
                  <b>Latest chap:</b> {truncString(result.attributes.latestChapter.name, 30)}
                </Col>
                <Col span={24}>
                  <b>Last released:</b> {formatDate(result.attributes.lastReleased)}
                </Col>
              </Row>
            </div>
          </div>
        );

        return (
          <div key={result._id} className="omnisearch-result-row">
            {result.type === "user-manga" ? (
              <Link to={buildMangaDetailPath(result)}>{content}</Link>
            ) : (
              <a href={result.attributes.link} target="_blank" rel="noreferrer noopener">
                {content}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

OmniSearchResult.propTypes = {
  userMangas: PropTypes.array.isRequired,
  isLoadingUserMangas: PropTypes.bool.isRequired,
};

export default OmniSearchResult;
