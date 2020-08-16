import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Input, Modal, Row, Select, Skeleton, Switch, Typography, message } from "antd";

import ChapterDropdownButton from "../ChapterDropdownButton";
import { MangaAPI } from "../../api";
import { clonePlainObject } from "../../utils";
import { READING, SHELVES } from "../../utils/constants";
import { checkResponse, notifyError } from "../../utils/error-handler";
import "./NewMangaModel.less";

const { Search } = Input;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewMangaModal = ({ open, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState();
  const [link, setLink] = useState("");
  const [manga, setManga] = useState();
  const [form] = Form.useForm();

  const changeChapterReadStatus = (isRead, chapIds) => {
    const cloneManga = clonePlainObject(manga);
    cloneManga.chapters.forEach((ch) => {
      if (chapIds.includes(ch.link)) {
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
      .then(async (response) => {
        checkResponse(response);
        const data = await response.json();
        if (response.ok) {
          message.success("Manga added");
          onCancel();
          setLink("");
          setManga(undefined);
          form.resetFields();
        } else {
          setErrors(data.errors);
        }
      })
      .catch(notifyError)
      .finally(() => setIsAdding(false));
  };

  useEffect(() => {
    if (link.trim() === "") {
      return;
    }
    setIsLoading(true);
    setErrors(undefined);
    MangaAPI.info(link)
      .then(async (response) => {
        checkResponse(response);
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
  }, [link]);

  let footer = null;
  if (manga) {
    footer = (
      <Button type="primary" loading={isAdding} onClick={addManga}>
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
    const initialValues = {
      link,
      shelf: READING,
      hidden: false,
      isCompleted: manga.isCompleted,
      note: "",
      readChapters: [],
    };
    content = (
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <img src={manga.image} alt={manga.name} />
        </Col>
        <Col xs={24} sm={16}>
          <Title level={4}>{manga.name}</Title>
          <Form form={form} initialValues={initialValues}>
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
                <Switch size="small" />
              </Form.Item>
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
    <Modal visible={open} onCancel={onCancel} title="Add new manga" footer={footer}>
      <Search
        placeholder="Enter manga link"
        enterButton
        autoFocus={true}
        loading={isLoading}
        onSearch={(value) => setLink(value)}
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
  open: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default NewMangaModal;
