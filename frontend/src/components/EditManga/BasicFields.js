import { useContext } from "react";
import Proptypes from "prop-types";

import FilterDropdown from "../Filters/FilterDropdown";
import LoopButton from "../Filters/LoopButton";
import { MangaContext } from "../../contexts";
import { SHELVES } from "../../utils/constants";
import "./BasicFields.less";

const BasicFields = ({ layout }) => {
  const { manga, editMangaField } = useContext(MangaContext);
  const block = layout === "column";

  return (
    <div className={`basic-fields ${layout}`}>
      <FilterDropdown
        displayName={"Shelf"}
        options={SHELVES}
        showAnyOption={false}
        selected={manga.shelf}
        onSelect={editMangaField("shelf")}
        block={block}
      />
      <LoopButton
        displayName={"Completed"}
        options={["true", "false"]}
        showAnyOption={false}
        selected={String(manga.isCompleted)}
        onSelect={editMangaField("isCompleted")}
        block={block}
      />
      <LoopButton
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

BasicFields.propTypes = {
  layout: Proptypes.oneOf(["column", "row"]).isRequired,
};

export default BasicFields;
