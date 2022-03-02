import { useContext } from "react";

import { Spin, Skeleton, Grid } from "antd";

import { ChapterList, MangaNonEditableInfo, MangaUserInputProps, BackToTopButton } from "../../components";
import { MangaContext } from "../../contexts";
import { statusToClassMapping } from "../../utils/manga";
import "./MangaDetailRightPanel.less";

const { useBreakpoint } = Grid;

const MangaDetailRightPanel = () => {
  const { manga, isLoading, isMarkingChapters } = useContext(MangaContext);
  const isDesktop = useBreakpoint().lg;

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
          <MangaUserInputProps layout={isDesktop ? "row" : "column"} />
          <ChapterList type="scroll" height="infinite" />
          <BackToTopButton />
        </div>
      </Spin>
    </div>
  );
};

export default MangaDetailRightPanel;
