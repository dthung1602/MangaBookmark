import { useContext } from "react";

import Proptypes from "prop-types";
import { Button, Dropdown, Menu } from "antd";
import {
  CheckSquareOutlined,
  DeleteOutlined,
  EditOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MoreOutlined,
  PlusSquareOutlined,
  RetweetOutlined,
} from "@ant-design/icons";

import { MangaContext } from "../../../contexts";
import "./MangaMenu.less";

const MangaMenu = ({ expand, toggleExpand, enableEdit }) => {
  const { updateManga, deleteManga, markAll, markOne, nextChapToRead } = useContext(MangaContext);
  const markLatestChap = () => markOne(nextChapToRead);

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item icon={<CheckSquareOutlined />} onClick={markAll} disabled={nextChapToRead.empty}>
            Mark all
          </Menu.Item>
          <Menu.Item icon={<PlusSquareOutlined />} onClick={markLatestChap} disabled={nextChapToRead.empty}>
            Mark one
          </Menu.Item>
          <Menu.Item icon={<EditOutlined />} onClick={enableEdit}>
            Edit
          </Menu.Item>
          <Menu.Item icon={expand ? <FullscreenExitOutlined /> : <FullscreenOutlined />} onClick={toggleExpand}>
            {expand ? "Hide" : "Show"} details
          </Menu.Item>
          <Menu.Item icon={<RetweetOutlined />} onClick={updateManga}>
            Update
          </Menu.Item>
          <Menu.Item danger icon={<DeleteOutlined />} onClick={deleteManga}>
            Delete
          </Menu.Item>
        </Menu>
      }
      trigger={["click", "hover"]}
    >
      <Button type="text" shape="circle" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

MangaMenu.propTypes = {
  expand: Proptypes.bool.isRequired,
  toggleExpand: Proptypes.func.isRequired,
  enableEdit: Proptypes.func.isRequired,
};

export default MangaMenu;
