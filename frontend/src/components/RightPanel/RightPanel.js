import { useContext } from "react";
import Proptypes from "prop-types";

import { Empty, Popconfirm, Spin, Typography } from "antd";
import { CheckOutlined, DeleteOutlined, SyncOutlined } from "@ant-design/icons";

import MangaCover from "../MangaCover";
import { BasicFields, ChapterList } from "../EditManga";
import MangaDescription from "../MangaDescription";
import { MangaContext } from "../../contexts";
import "./RightPanel.less";

import PLACE_HOLDER_IMG from "../../assets/right-panel-footer.webp";

const { Title } = Typography;

const RightPanel = ({ showImage }) => {
  const { manga, updateManga, deleteManga, isLoading, disableMarkAll, markAll, isMarkingChapters } =
    useContext(MangaContext);

  if (manga === null) {
    return (
      <div id="right-panel">
        <br /> <br /> <br />
        <Empty description="Click a row to view detail" />
      </div>
    );
  }

  return (
    <div id="right-panel">
      <Spin key="spin" spinning={isLoading || isMarkingChapters}>
        <div key="manga-cover" className="manga-cover-image-wrapper">
          <MangaCover
            key={manga.image}
            className="manga-cover-image"
            src={manga.image}
            mangaSite={manga.site}
            alt={manga.name}
            onClick={() => showImage({ src: manga.image, mangaSite: manga.site })}
          />
          <div className="quick-actions">
            <Popconfirm title="Delete this manga?" placement="right" onConfirm={deleteManga}>
              <div className="delete">
                <DeleteOutlined />
                <span>Delete</span>
              </div>
            </Popconfirm>
            <div className="update" onClick={updateManga}>
              <SyncOutlined />
              <span>Update</span>
            </div>
            {disableMarkAll ? null : (
              <div className="mark-all" onClick={markAll}>
                <CheckOutlined />
                <span>Mark all</span>
              </div>
            )}
          </div>
        </div>
        <Title key="title" level={3}>
          <a href={manga.link} target="_blank" rel="noopener noreferrer">
            {manga.name}
          </a>
        </Title>
        <MangaDescription />
        <BasicFields key="basic-field" manga={manga} layout="row" />
        <ChapterList key="chapter-list" type="page" manga={manga} />
        <div key="place-holder" className="placeholder">
          <img src={PLACE_HOLDER_IMG} alt="" />
        </div>
      </Spin>
    </div>
  );
};

RightPanel.propTypes = {
  showImage: Proptypes.func.isRequired,
};

export default RightPanel;
