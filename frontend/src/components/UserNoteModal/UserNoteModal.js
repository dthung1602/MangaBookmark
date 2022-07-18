import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Input, message } from "antd";

import { UserAPI } from "../../api";
import { GlobalContext } from "../GlobalContext";
import { notifyError, throwOnCriticalErrors } from "../../utils/error-handler";
import "./UserNoteModal.less";

const UserNoteModal = ({ open, onCancel }) => {
  const [{ user }, updateGlobalContext] = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState(user.note);

  const updateNote = () => {
    setIsLoading(true);
    UserAPI.patch({ note })
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        const newUser = await response.json();
        updateGlobalContext({ user: newUser });
        message.success("Note saved");
        onCancel();
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const footer = (
    <>
      <Button disabled={isLoading} onClick={onCancel}>
        Cancel
      </Button>
      <Button loading={isLoading} type="primary" onClick={updateNote}>
        OK
      </Button>
    </>
  );

  return (
    <Modal visible={open} width={650} onCancel={onCancel} title="Note" footer={footer}>
      <Input.TextArea rows={7} disabled={isLoading} value={note} onChange={(event) => setNote(event.target.value)} />
    </Modal>
  );
};

UserNoteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserNoteModal;
