import { useState, useContext } from "react";

import PropTypes from "prop-types";
import { Button, message } from "antd";

import { MangaContext } from "../../../contexts";
import { MangaAPI } from "../../../api";
import { notifyError, throwOnCriticalErrors } from "../../../utils/error-handler";
import "./ModalFooter.less";

const ModalFooter = ({ onCancel, addMangaDone }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { manga, isLoading, setErrors } = useContext(MangaContext);

  if (!manga || isLoading) {
    return null;
  }

  const addManga = () => {
    setIsAdding(true);
    setErrors([]);

    const params = {
      link: manga.link,
      shelf: manga.shelf,
      hidden: manga.hidden,
      isCompleted: manga.isCompleted,
      note: manga.note,
      nextRereadChapterLink: manga.nextRereadChapter?.link,
      readChapters: manga.chapters.filter((ch) => ch.isRead).map((ch) => ch.link),
    };

    MangaAPI.post(params)
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const data = await response.json();
        if (response.ok) {
          message.success("Manga added");
          onCancel();
          addMangaDone(data);
        } else {
          setErrors(data.errors);
        }
      })
      .catch(notifyError)
      .finally(() => setIsAdding(false));
  };

  return (
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
};

ModalFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  addMangaDone: PropTypes.func.isRequired,
};

export default ModalFooter;
