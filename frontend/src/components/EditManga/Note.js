import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

import "./Note.less";

const Note = ({ note, editNote }) => {
  const [editing, setEditing] = useState(false);
  const textAreaRef = useRef();

  useEffect(() => setEditing(false), [note]);

  const edit = () => {
    editNote(textAreaRef.current.resizableTextArea.props.value).then(() => setEditing(false));
  };

  if (editing) {
    return (
      <div className="edit-note">
        <Input.TextArea ref={textAreaRef} defaultValue={note} />
        <div className="btn-group">
          <Button size="small" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button size="small" type="primary" onClick={edit}>
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {note === "" ? <i>empty</i> : note}
      &nbsp;&nbsp;
      <Button size="small" type="dashed" icon={<EditOutlined />} onClick={() => setEditing(true)} />
    </>
  );
};

Note.propTypes = {
  note: PropTypes.string.isRequired,
  editNote: PropTypes.func.isRequired,
};

export default Note;
