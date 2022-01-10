import { useContext } from "react";

import { Spin, Button, Skeleton } from "antd";

import { ChapterList, MangaNonEditableInfo, MangaUserInputProps } from "../../components";
import { MangaContext } from "../../contexts";
import { scrollToTop } from "../../utils";
import { statusToClassMapping } from "../../utils/manga";
import "./MangaDetailRightPanel.less";

const MangaDetailRightPanel = () => {
  const { manga, isLoading, isMarkingChapters } = useContext(MangaContext);

  if (!manga) {
    return (
      <div className="manga-detail-right-panel">
        <div className="triangle large top-right">
          <Skeleton active={true} />
          <Skeleton active={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="manga-detail-right-panel">
      <Spin key="spin" spinning={isLoading || isMarkingChapters}>
        <div className={"triangle large top-right " + statusToClassMapping[manga.status]}>
          <MangaNonEditableInfo />
          <MangaUserInputProps layout="row" />
          <ChapterList type="scroll" height="infinite" />
          <Button block type="link" className="scroll-to-top" onClick={scrollToTop}>
            ↑ Back to top
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default MangaDetailRightPanel;
