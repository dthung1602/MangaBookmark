import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Input, Modal, Row, Select, Skeleton, Space, Switch, Typography, message } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

import MangaCover from "../MangaCover";
import { ChapterList } from "../EditManga";
import { MangaAPI } from "../../api";
import { clonePlainObject, isNonEmptyArray } from "../../utils";
import { READING, SHELVES } from "../../utils/constants";
import { throwOnCriticalErrors, notifyError } from "../../utils/error-handler";
import "./NewMangaModel.less";

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewMangaModal = ({ open, onCancel, addMangaDone }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [expand, setExpand] = useState(false);
  const [errors, setErrors] = useState();
  const [link, setLink] = useState("");
  const [manga, setManga] = useState();
  const [form] = Form.useForm();

  const toggleExpand = () => setExpand(!expand);

  const changeChapterReadStatus = (mangaId, isRead, chapLinks) => {
    const cloneManga = clonePlainObject(manga);
    cloneManga.chapters.forEach((ch) => {
      if (chapLinks.includes(ch.link)) {
        ch.isRead = isRead;
      }
    });
    setManga(cloneManga);
  };

  const addManga = () => {
    const readChapters = manga.chapters.filter((ch) => ch.isRead).map((ch) => ch.link);
    const params = { ...form.getFieldsValue(), link, readChapters };
    setIsAdding(true);
    setErrors(undefined);
    MangaAPI.post(params)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const data = await response.json();
        if (response.ok) {
          message.success("Manga added");
          onCancel();
          setLink("");
          setManga(undefined);
          form.resetFields();
          addMangaDone(data);
        } else {
          setErrors(data.errors);
        }
      })
      .catch(notifyError)
      .finally(() => setIsAdding(false));
  };

  const onSearch = () => {
    if (link.trim() === "") {
      return;
    }
    setIsLoading(true);
    setErrors(undefined);
    setExpand(false);
    MangaAPI.info(link)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const data = await response.json();
        if (response.ok) {
          setManga(data);
        } else {
          setManga(undefined);
          setErrors(data.errors);
        }
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  let footer = null;
  if (manga) {
    footer = (
      <>
        {!isAdding ? (
          <Button loading={isAdding} onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="primary" loading={isAdding} onClick={addManga}>
          Add
        </Button>
      </>
    );
  }

  let additionalInfo = null;
  if (expand && manga) {
    additionalInfo = [];
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
    const initialValues = {
      link,
      shelf: READING,
      hidden: false,
      isCompleted: manga.isCompleted,
      note: "",
      readChapters: [],
    };
    content = (
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
          <Form form={form} initialValues={initialValues}>
            {additionalInfo}
            <div className="info-row">
              <Text strong>Shelf</Text>
              <Form.Item noStyle name="shelf">
                <Select size="small" defaultValue={READING}>
                  {Object.entries(SHELVES).map(([key, displayText]) => (
                    <Option value={key} key={key}>
                      {displayText}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="info-row">
              <Text strong>Hidden</Text>
              <Form.Item noStyle name="hidden">
                <Switch size="small" />
              </Form.Item>
            </div>
            <div className="info-row">
              <Text strong>Is completed</Text>
              <Form.Item noStyle name="isCompleted">
                <Switch size="small" defaultChecked={manga.isCompleted} />
              </Form.Item>
            </div>
            <div className="info-row">
              <ChapterList
                key="chapter"
                type="scroll"
                showDate={false}
                manga={manga}
                isLoading={false}
                onChangeChapterStatus={changeChapterReadStatus}
                maxChapNameLen={35}
              />
            </div>
            <div className="info-col">
              <Text strong>Note</Text>
              <Form.Item noStyle name="note">
                <TextArea row={2} />
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    );
  } else {
    content = null;
  }

  return (
    <Modal visible={open} onCancel={onCancel} width={650} title="Add new manga" footer={footer}>
      <Search
        placeholder="Enter manga link"
        enterButton
        autoFocus={true}
        value={link}
        onChange={(event) => setLink(event.target.value)}
        loading={isLoading}
        onSearch={onSearch}
      />
      {!errors ? null : (
        <div className="manga-preview-errors">
          {Object.entries(errors).map(([field, { msg }]) => (
            <div key={field}>
              <b>{field}: </b> {msg}
            </div>
          ))}
        </div>
      )}
      <div className="manga-preview">{content}</div>
    </Modal>
  );
};

NewMangaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  addMangaDone: PropTypes.func.isRequired,
};

export default NewMangaModal;
