import { useContext } from "react";

import { Spin } from "antd";

import { ChapterList, MangaNoneEditableInfo, MangaUserInputProps } from "../../components";
import { MangaContext } from "../../contexts";
import "./MangaDetailRightPanel.less";

const MangaDetailRightPanel = () => {
  const { isLoading, isMarkingChapters } = useContext(MangaContext);

  return (
    <div className="manga-detail-right-panel">
      <Spin key="spin" spinning={isLoading || isMarkingChapters}>
        <MangaNoneEditableInfo />
        <MangaUserInputProps layout="row" />
        <ChapterList type="scroll" height="tall" />
      </Spin>
    </div>
  );
};

export default MangaDetailRightPanel;
