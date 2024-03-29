import { useContext, useState } from "react";

import PropTypes from "prop-types";
import { Button, Card, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import MangaMenu from "../MangaMenu";
import { ChapterList, MangaBasicInfo, MangaCover, MangaUserInputProps, StartReadingButtons } from "../../../components";
import { useMangaAPIContext } from "../../../hooks";
import { statusToClassMapping } from "../../../utils/manga";
import { MangaContext, MangaListContext } from "../../../contexts";
import "./MangaCard.less";

const MangaCard = ({ manga }) => {
  const mangaListContext = useContext(MangaListContext);
  const mangaContext = useMangaAPIContext(manga, mangaListContext);

  const [editEnabled, setEditEnabled] = useState(false);
  const [expand, setExpand] = useState(false);

  const statusClass = statusToClassMapping[manga.status];

  const toggleExpand = () => setExpand(!expand);

  const headerExtra = editEnabled ? (
    <Button type="text" shape="circle" icon={<CloseOutlined />} onClick={() => setEditEnabled(false)} />
  ) : (
    <MangaMenu enableEdit={() => setEditEnabled(true)} expand={expand} toggleExpand={toggleExpand} />
  );

  return (
    <Spin spinning={mangaContext.isLoading}>
      <MangaContext.Provider value={mangaContext}>
        <Card
          className={`manga-card triangle bottom-right ${statusClass}`}
          cover={
            <div className="cover">
              <MangaCover alt={manga.name} src={manga.image} mangaSite={manga.site} />
            </div>
          }
        >
          <div className={`collapsable ${editEnabled ? "collapsed" : ""}`}>
            <MangaBasicInfo headerExtra={headerExtra} showAdditionalInfo={expand} />
            <StartReadingButtons />
          </div>
          {editEnabled
            ? [
                <MangaUserInputProps key="user-input-props" layout="column" />,
                <ChapterList key="chapter" type="scroll" showDate={false} maxChapNameLen={27} />,
              ]
            : null}
        </Card>
      </MangaContext.Provider>
    </Spin>
  );
};

MangaCard.propTypes = {
  manga: PropTypes.object.isRequired,
};

export default MangaCard;
