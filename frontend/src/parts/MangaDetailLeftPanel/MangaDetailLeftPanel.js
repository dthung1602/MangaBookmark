import { useContext } from "react";
import { Button, Space } from "antd";

import { MangaCover } from "../../components";
import { MangaContext } from "../../contexts";
import "./MangaDetailLeftPanel.less";

const MangaDetailLeftPanel = () => {
  const { manga } = useContext(MangaContext);

  return (
    <Space direction="vertical" size="large" className="manga-detail-left-panel">
      <MangaCover src={manga.image} mangaSite={manga.site} className="manga-cover-image" />
      <Button type="primary" size="large" block>
        <b>Shelf:</b>
        &nbsp;&nbsp;
        {manga.shelf}
      </Button>
      <Button size="large" block>
        Another button
      </Button>
    </Space>
  );
};

export default MangaDetailLeftPanel;
