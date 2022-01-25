import { useCallback, useState } from "react";

import PropTypes from "prop-types";
import { Col, Row, Button, Space, message } from "antd";
import { HistoryOutlined, ReadOutlined } from "@ant-design/icons";

import { MangaSiteLink } from "../../../components";
import { MangaAPI } from "../../../api";
import { formatDate, truncString } from "../../../utils";
import { notifyError, throwOnCriticalErrors } from "../../../utils/error-handler";
import { READING, TO_READ } from "../../../utils/constants";
import "./OmniSearchResultScanlationMangaRow.less";

const OmniSearchResultScanlationMangaRow = ({ result }) => {
  const [isAdding, setIsAdding] = useState(false);

  const addMangaToShelf = useCallback(
    (shelf) => (event) => {
      event.preventDefault();

      setIsAdding(true);

      const params = {
        link: result.attributes.link,
        shelf,
        hidden: false,
        note: "",
        readChapters: [],
      };

      MangaAPI.post(params)
        .result.then(async (response) => {
          throwOnCriticalErrors(response);
          if (!response.ok) {
            throw Error("Cannot add manga. Status code: " + response.statusCode);
          } else {
            message.success("Manga added to " + shelf + " shelf");
          }
        })
        .catch(notifyError)
        .finally(() => setIsAdding(false));
    },
    [result.attributes.link],
  );

  return (
    <div className="omnisearch-result-row">
      <a href={result.attributes.link} target="_blank" rel="noopener noreferrer" className="omnisearch-content">
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
              <b>Author:</b> {result.attributes.authors ? result.attributes.authors.join("-") : "n/a"}
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
            <Col span={24}>
              <Space className="omnisearch-result-scanlation-manga-buttons">
                <Button
                  type="default"
                  size="small"
                  icon={<HistoryOutlined />}
                  loading={isAdding}
                  onClick={addMangaToShelf(TO_READ)}
                >
                  Read later
                </Button>
                <Button
                  type="primary"
                  size="small"
                  icon={<ReadOutlined />}
                  loading={isAdding}
                  onClick={addMangaToShelf(READING)}
                >
                  Read now
                </Button>
              </Space>
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
