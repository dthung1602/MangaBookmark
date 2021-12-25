import { useContext } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Grid, Typography } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";

import { MangaBasicInfo, StartReadingButtons } from "../../../components";
import { useMangaContext } from "../../../hooks";
import { MangaContext, MangaListContext } from "../../../contexts";
import { statusToClassMapping } from "../../../utils/manga";
import { buildMangaDetailPath } from "../../../utils";
import "./MangaTableDesktopRow.less";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const MangaTableDesktopRow = ({ manga }) => {
  const { editMangaDone, updateMangaDone, deleteMangaDone } = useContext(MangaListContext);
  const mangaContext = useMangaContext(manga, editMangaDone, updateMangaDone, editMangaDone, deleteMangaDone);
  const numberOfColumns = useBreakpoint().xxl ? 2 : 1;
  const mangaStatusClass = statusToClassMapping[manga.status];

  return (
    <MangaContext.Provider value={mangaContext}>
      <div className={"triangle top-right " + mangaStatusClass}>
        <Title level={4}>
          <a href={manga.link} target="_blank" rel="noopener noreferrer">
            {manga.name}
          </a>
          <Link to={buildMangaDetailPath(manga)} className="expand-btn">
            <FullscreenOutlined />
          </Link>
        </Title>
        <div className="manga-details">
          <MangaBasicInfo showTitle={false} numberOfColumns={numberOfColumns} />
          <StartReadingButtons manga={manga} updateMangaDone={updateMangaDone} />
        </div>
      </div>
    </MangaContext.Provider>
  );
};

MangaTableDesktopRow.propTypes = {
  manga: PropTypes.object.isRequired,
};

export default MangaTableDesktopRow;
