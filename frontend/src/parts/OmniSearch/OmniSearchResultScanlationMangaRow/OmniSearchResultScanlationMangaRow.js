import PropTypes from "prop-types";
import { Col, Row } from "antd";

import { MangaSiteLink } from "../../../components";
import { formatDate, truncString } from "../../../utils";
import "./OmniSearchResultScanlationMangaRow.less";

const OmniSearchResultScanlationMangaRow = ({ result }) => {
  return (
    <div className="omnisearch-result-row">
      <a href={result.link} target="_blank" rel="noopener noreferrer" className="omnisearch-content">
        <div className="omnisearch-cover">
          <img src={result.image} alt={result.name} />
        </div>
        <div className="omnisearch-info">
          <div className="omnisearch-name">{result.name}</div>
          <div className="omnisearch-short-description">
            <span>
              <b>Site:</b> &nbsp;
              <MangaSiteLink mangaSiteName={result.attributes.site} />
            </span>
            <span>
              <b>Status:</b> {result.isCompleted ? "Completed" : "On-going"}
            </span>
          </div>
          <Row className="omnisearch-long-description" gutter={[0, 4]}>
            <Col span={14}>
              <b>Author:</b> {result.attributes.authors.join("-")}
            </Col>
            <Col span={10}>
              <b>Total chapters:</b> {result.attributes.totalChapters ?? "n/a"}
            </Col>
            <Col span={24}>
              <b>Latest chap:</b> {truncString(result.attributes.latestChapter.name, 30)}
            </Col>
            <Col span={24}>
              <b>Last released:</b> {formatDate(result.attributes.lastReleased)}
            </Col>
          </Row>
        </div>
      </a>
    </div>
  );
};

OmniSearchResultScanlationMangaRow.propTypes = {
  result: PropTypes.object.isRequired,
};

export default OmniSearchResultScanlationMangaRow;
