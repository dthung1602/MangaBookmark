import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Row, Col, Form, Input, Typography, Skeleton, Select, Switch, Button } from "antd";

import dummyManga from "../../utils/dummyManga.json";
import ChapterDropdownButton from "../ChapterDropdownButton";
import { clonePlainObject } from "../../utils";
import { READING, SHELVES } from "../../utils/constants";
import "./NewMangaModel.less";

const { Search } = Input;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewMangaModal = ({ open, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState();
  const [manga, setManga] = useState();

  const changeChapterReadStatus = (isRead, chapIds) => {
    const cloneManga = clonePlainObject(manga);
    cloneManga.chapters.forEach((ch) => {
      if (chapIds.includes(ch._id)) {
        ch.isRead = isRead;
      }
    });
    setManga(cloneManga);
  };

  const addManga = () => {
    console.log("ADD");
  };

  const getMangaInfo = (value) => {
    setLink(value);
    setIsLoading(true);
    setTimeout(() => {
      setManga(dummyManga);
      setIsLoading(false);
    }, 5000);
  };

  let footer = null;
  if (manga) {
    footer = (
      <Button type="primary" onClick={addManga}>
        Add
      </Button>
    );
  }

  let content;
  if (isLoading) {
    content = (
      <Row>
        <Col span={8}>
          <Skeleton.Image />
        </Col>
        <Col span={16}>
          <Skeleton active />
        </Col>
      </Row>
    );
  } else if (manga) {
    content = (
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <img src={manga.image} alt={manga.name} />
        </Col>
        <Col xs={24} sm={16}>
          <Title level={4}>{manga.name}</Title>
          <div className="info-row">
            <Text strong>Shelf</Text>
            <Select size="small" defaultValue={READING}>
              {Object.entries(SHELVES).map(([key, displayText]) => (
                <Option value={key} key={key}>
                  {displayText}
                </Option>
              ))}
            </Select>
          </div>
          <div className="info-row">
            <Text strong>Hidden</Text>
            <Switch size="small" />
          </div>
          <div className="info-row">
            <Text strong>Is completed</Text>
            <Switch size="small" />
          </div>
          <div className="info-row">
            <Text strong>Chapter list</Text>
            <ChapterDropdownButton
              chapters={manga.chapters}
              defaultShowReadChaps={true}
              defaultShowCheckBoxes={true}
              onChangeReadStatus={changeChapterReadStatus}
              size="small"
            />
          </div>
          <div className="info-col">
            <Text strong>Note</Text>
            <TextArea row={2} />
          </div>
        </Col>
      </Row>
    );
  } else {
    content = null;
  }

  return (
    <Modal visible={open} onCancel={onCancel} title="Add new manga" footer={footer}>
      <Search
        placeholder="Enter manga link"
        enterButton
        autoFocus={true}
        loading={isLoading}
        onSearch={getMangaInfo}
      />
      <div className="manga-preview">{content}</div>
    </Modal>
  );
};

NewMangaModal.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default NewMangaModal;
