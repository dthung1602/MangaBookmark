import { useContext } from "react";

import { Button, Dropdown } from "antd";
import { DeleteOutlined, FullscreenOutlined, MoreOutlined, RetweetOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { buildMangaDetailRoute } from "../../../utils/route";
import { MangaContext } from "../../../contexts";
import "./MangaMenu.less";

const MangaMenu = () => {
  const { manga, updateManga, deleteManga } = useContext(MangaContext);
  const navigate = useNavigate();
  const showDetail = () => navigate(buildMangaDetailRoute(manga._id));

  const items = [
    {
      label: "Details",
      key: "detail",
      icon: <FullscreenOutlined />,
    },
    {
      label: "Update",
      key: "update",
      icon: <RetweetOutlined />,
    },
    {
      label: "Delete",
      key: "delete",
      icon: <DeleteOutlined />,
    },
  ];

  const handleMenuClicked = (e) => {
    switch (e.key) {
      case "detail":
        return showDetail();
      case "update":
        return updateManga();
      case "delete":
        return deleteManga();
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClicked }} trigger={["click", "hover"]}>
      <Button type="text" shape="circle" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default MangaMenu;
