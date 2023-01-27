import { useCallback, useState } from "react";

import PropTypes from "prop-types";
import { Modal } from "antd";

import ModalFooter from "./ModalFooter";
import { MangaCompactPreview, MangaUrlInput } from "../../components";
import { MangaAPI } from "../../api";
import { useMangaLocalContext } from "../../hooks";
import { MangaContext } from "../../contexts";
import "./NewMangaModel.less";

const NewMangaModal = ({ open, onCancel, addMangaDone }) => {
  const [link, setLink] = useState("");
  const loadManga = useCallback(() => (link === "" ? null : MangaAPI.info(link)), [link]);
  const mangaContext = useMangaLocalContext(loadManga);

  const wrappedOnCancel = () => {
    setLink("");
    onCancel();
  };

  return (
    <MangaContext.Provider value={mangaContext}>
      <Modal
        open={open}
        onCancel={wrappedOnCancel}
        width={650}
        title="Add new manga"
        footer={<ModalFooter onCancel={wrappedOnCancel} addMangaDone={addMangaDone} />}
      >
        <MangaUrlInput onSearch={setLink} />
        <MangaCompactPreview />
      </Modal>
    </MangaContext.Provider>
  );
};

NewMangaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  addMangaDone: PropTypes.func.isRequired,
};

export default NewMangaModal;
