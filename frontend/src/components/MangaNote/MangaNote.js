import { useContext, useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { MangaContext } from "../../contexts";
import "./MangaNote.less";

const MangaNote = () => {
  const {
    manga: { note },
    editMangaField,
  } = useContext(MangaContext);
  const [editing, setEditing] = useState(false);
  const textAreaRef = useRef();

  useEffect(() => setEditing(false), [note]);

  const edit = () => {
    editMangaField("note")(textAreaRef.current.resizableTextArea.props.value).then(() => setEditing(false));
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

export default MangaNote;
