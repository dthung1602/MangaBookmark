import { useContext } from "react";

import { Empty, Spin, Typography } from "antd";

import MangaCover from "../../components/MangaCover";
import ChapterList from "../../components/ChapterList";
import MangaUserInputProps from "../../components/MangaUserInputProps";
import MangaNonEditableInfo from "../../components/MangaNonEditableInfo";
import VerticalActions from "./VerticalActions";
import { MangaContext } from "../../contexts";
import "./PreviewRightPanel.less";

import PLACE_HOLDER_IMG from "../../assets/right-panel-footer.webp";

const { Title } = Typography;

const PreviewRightPanel = () => {
  const { manga, isLoading, isMarkingChapters } = useContext(MangaContext);

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
          <VerticalActions />
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
