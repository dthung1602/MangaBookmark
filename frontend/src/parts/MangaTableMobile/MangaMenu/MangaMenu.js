import { useContext } from "react";

import { Button, Dropdown, Menu } from "antd";
import { DeleteOutlined, FullscreenOutlined, MoreOutlined, RetweetOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { buildMangaDetailRoute } from "../../../utils/route";
import { MangaContext } from "../../../contexts";
import "./MangaMenu.less";

const MangaMenu = () => {
  const { manga, updateManga, deleteManga } = useContext(MangaContext);
  const history = useHistory();
  const showDetail = () => history.push(buildMangaDetailRoute(manga._id));

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item icon={<FullscreenOutlined />} onClick={showDetail}>
            Details
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

export default MangaMenu;