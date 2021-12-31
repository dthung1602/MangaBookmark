import { useContext, useCallback } from "react";

import { useHistory } from "react-router-dom";
import { Empty, Spin, Typography, Popconfirm } from "antd";
import { FullscreenOutlined, SyncOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  MangaCover,
  ChapterList,
  VerticalButtonGroup,
  MangaUserInputProps,
  MangaNonEditableInfo,
} from "../../components";
import { buildMangaDetailPath } from "../../utils";
import { MangaContext } from "../../contexts";
import "./PreviewRightPanel.less";

import PLACE_HOLDER_IMG from "../../assets/right-panel-footer.webp";

const { Title } = Typography;

const PreviewRightPanel = () => {
  const { manga, isLoading, isMarkingChapters, updateManga, deleteManga } = useContext(MangaContext);
  const history = useHistory();

  const viewDetail = useCallback(() => history.push(buildMangaDetailPath(manga)), [manga, history]);

  if (manga === null) {
    return (
      <div id="preview-right-panel">
        <br /> <br /> <br />
        <Empty description="Click a row to view detail" />
      </div>
    );
  }

  return (
    <div id="preview-right-panel">
      <Spin key="spin" spinning={isLoading || isMarkingChapters}>
        <div key="manga-cover" className="manga-cover-image-wrapper">
          <MangaCover
            key={manga.image}
            className="manga-cover-image"
            src={manga.image}
            mangaSite={manga.site}
            alt={manga.name}
          />
          <VerticalButtonGroup side="right" expandOnHover={true}>
            <VerticalButtonGroup.Button type="primary" icon={<FullscreenOutlined />} onClick={viewDetail}>
              Detail
            </VerticalButtonGroup.Button>
            <VerticalButtonGroup.Button type="warning" icon={<SyncOutlined />} onClick={updateManga}>
              Update
            </VerticalButtonGroup.Button>
            <Popconfirm title="Delete this manga?" placement="bottom" onConfirm={deleteManga}>
              <VerticalButtonGroup.Button type="danger" icon={<DeleteOutlined />}>
                Delete
              </VerticalButtonGroup.Button>
            </Popconfirm>
          </VerticalButtonGroup>
        </div>
        <Title key="title" level={3}>
          <a href={manga.link} target="_blank" rel="noopener noreferrer">
            {manga.name}
          </a>
        </Title>
        <MangaNonEditableInfo />
        <MangaUserInputProps layout="row" />
        <ChapterList key="chapter-list" type="page" />
        <div key="place-holder" className="placeholder">
          <img src={PLACE_HOLDER_IMG} alt="" />
        </div>
      </Spin>
    </div>
  );
};

export default PreviewRightPanel;
