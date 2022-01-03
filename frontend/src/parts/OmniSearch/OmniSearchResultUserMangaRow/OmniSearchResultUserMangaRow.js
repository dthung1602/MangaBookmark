import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

import { buildMangaDetailPath, formatDate, truncString } from "../../../utils";
import { MangaSiteLink, MangaStatus } from "../../../components";
import "./OmniSearchResultUserMangaRow.less";

const OmniSearchResultUserMangaRow = ({ result }) => {
  return (
    <div className="omnisearch-result-row">
      <Link to={buildMangaDetailPath(result)} className="omnisearch-content">
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
      </Link>
    </div>
  );
};

OmniSearchResultUserMangaRow.propTypes = {
  result: PropTypes.object.isRequired,
};

export default OmniSearchResultUserMangaRow;
