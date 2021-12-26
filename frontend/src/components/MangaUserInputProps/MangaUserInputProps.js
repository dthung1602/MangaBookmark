import { useContext } from "react";
import Proptypes from "prop-types";

import DropDownFilter from "../Filters/DropDownFilter/DropDownFilter";
import LoopButtonFilter from "../Filters/LoopButtonFilter/LoopButtonFilter";
import { MangaContext } from "../../contexts";
import { SHELVES } from "../../utils/constants";
import "./MangaUserInputProps.less";

const MangaUserInputProps = ({ layout }) => {
  const { manga, editMangaField } = useContext(MangaContext);
  const block = layout === "column";

  return (
    <div className={`manga-user-input-props ${layout}`}>
      <DropDownFilter
        displayName={"Shelf"}
        options={SHELVES}
        showAnyOption={false}
        selected={manga.shelf}
        onSelect={editMangaField("shelf")}
        block={block}
      />
      <LoopButtonFilter
        displayName={"Completed"}
        options={["true", "false"]}
        showAnyOption={false}
        selected={String(manga.isCompleted)}
        onSelect={editMangaField("isCompleted")}
        block={block}
      />
      <LoopButtonFilter
        displayName={"Hidden"}
        options={["true", "false"]}
        showAnyOption={false}
        selected={String(manga.hidden)}
        onSelect={editMangaField("hidden")}
        block={block}
      />
    </div>
  );
};

MangaUserInputProps.propTypes = {
  layout: Proptypes.oneOf(["column", "row"]).isRequired,
};

export default MangaUserInputProps;
