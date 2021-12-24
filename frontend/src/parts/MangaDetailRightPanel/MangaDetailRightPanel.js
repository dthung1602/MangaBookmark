import { useContext } from "react";

import { Spin, Button } from "antd";

import { ChapterList, MangaNoneEditableInfo, MangaUserInputProps } from "../../components";
import { MangaContext } from "../../contexts";
import { scrollToTop } from "../../utils";
import { statusToClassMapping } from "../../utils/manga";
import "./MangaDetailRightPanel.less";

const MangaDetailRightPanel = () => {
  const { manga, isLoading, isMarkingChapters } = useContext(MangaContext);

  return (
    <div className="manga-detail-right-panel">
      <Spin key="spin" spinning={isLoading || isMarkingChapters}>
        <div className={"triangle large top-right " + statusToClassMapping[manga.status]}>
          <MangaNoneEditableInfo />
          <MangaUserInputProps layout="row" />
          <ChapterList type="scroll" height="tall" />
          <Button block type="link" className="scroll-to-top" onClick={scrollToTop}>
            Scroll to top ↑
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default MangaDetailRightPanel;
