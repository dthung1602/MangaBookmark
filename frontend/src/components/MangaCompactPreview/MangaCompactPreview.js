import { useState, useContext } from "react";

import { Button, Col, Row, Select, Skeleton, Space, Switch, Typography, Input } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

import MangaCover from "../MangaCover";
import ChapterList from "../ChapterList";
import { isNonEmptyArray } from "../../utils";
import { READING, SHELVES } from "../../utils/constants";
import { MangaContext } from "../../contexts";
import "./MangaCompactPreview.less";

const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;

const MangaCompactPreview = () => {
  const { manga, isLoading, editMangaField } = useContext(MangaContext);
  const [expand, setExpand] = useState(false);

  if (isLoading) {
    return (
      <div className="manga-preview">
        <Row>
          <Col span={8}>
            <Skeleton.Image />
          </Col>
          <Col span={16}>
            <Skeleton active />
          </Col>
        </Row>
      </div>
    );
  }

  if (!manga) {
    return null;
  }

  const toggleExpand = () => setExpand(!expand);

  const additionalInfo = expand ? createAdditionalInfoNodes(manga) : null;

  return (
    <div className="manga-preview">
      <Row gutter={24}>
        <Col xs={24} sm={8}>
          <MangaCover src={manga.image} mangaSite={manga.site} alt={manga.name} />
          <Button
            block
            type="dashed"
            icon={expand ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={toggleExpand}
          >
            {expand ? "Hide" : "Show"} details
          </Button>
        </Col>

        <Col xs={24} sm={16}>
          <Title level={4}>
            <a href={manga.link} target="_blank" rel="noopener noreferrer">
              {manga.name}
            </a>
          </Title>

          {additionalInfo}

          <div className="info-row">
            {/*FIXME REREAD does not work*/}
            <Text strong>Shelf</Text>
            <Select size="small" value={manga.shelf || READING} onChange={editMangaField("shelf")}>
              {Object.entries(SHELVES).map(([key, displayText]) => (
                <Select.Option value={key} key={key}>
                  {displayText}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="info-row">
            <Text strong>Hidden</Text>
            {/* TODO add fallback logic to other manga-display component */}
            <Switch
              size="small"
              checked={manga.hidden === undefined ? false : manga.hidden}
              onChange={editMangaField("hidden")}
            />
          </div>

          <div className="info-row">
            <Text strong>Is completed</Text>
            <Switch size="small" checked={manga.isCompleted} onChange={editMangaField("isCompleted")} />
          </div>

          <div className="info-row">
            <ChapterList type="scroll" height="short" showDate={false} />
          </div>

          <div className="info-col">
            <Text strong>Note</Text>
            <TextArea
              row={2}
              value={manga.note || ""}
              onChange={(event) => editMangaField("note")(event.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const createAdditionalInfoNodes = (manga) => {
  const additionalInfo = [];
  if (isNonEmptyArray(manga.authors)) {
    additionalInfo.push(
      <div className="info-row">
        <Text strong>Author</Text>
        <Text>{manga.authors.join(" - ")}</Text>
      </div>,
    );
  }
  if (isNonEmptyArray(manga.alternativeNames)) {
    additionalInfo.push(
      <div className="info-row">
        <Text strong>Other names</Text>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
          {manga.alternativeNames.length > 1 ? "•" : ""} {manga.alternativeNames[0]}
          {manga.alternativeNames.slice(1).map((name) => (
            <>
              <br />• {name}
            </>
          ))}
        </Paragraph>
      </div>,
    );
  }
  if (isNonEmptyArray(manga.tags)) {
    additionalInfo.push(
      <Space wrap>
        <Text strong>Tags</Text>
        {manga.tags.map((tagName) => (
          <div key={tagName} className="manga-tag">
            {tagName}
          </div>
        ))}
      </Space>,
    );
  }
  if (manga.description) {
    additionalInfo.push(
      <div className="description">
        <Text strong>Description</Text>
        <Paragraph className="wrap" ellipsis={{ rows: 1, expandable: true, symbol: "more" }}>
          {manga.description}
        </Paragraph>
      </div>,
    );
  }
  return additionalInfo;
};

export default MangaCompactPreview;
