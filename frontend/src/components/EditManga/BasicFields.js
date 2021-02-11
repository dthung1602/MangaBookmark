import Proptypes from "prop-types";

import FilterDropdown from "../Filters/FilterDropdown";
import LoopButton from "../Filters/LoopButton";
import { SHELVES } from "../../utils/constants";
import "./BasicFields.less";

const BasicFields = ({ manga, editManga, layout }) => {
  const block = layout === "column";

  return (
    <div className={`basic-fields ${layout}`}>
      <FilterDropdown
        displayName={"Shelf"}
        options={SHELVES}
        showAnyOption={false}
        selected={manga.shelf}
        onSelect={editManga("shelf")}
        block={block}
      />
      <LoopButton
        displayName={"Completed"}
        options={["true", "false"]}
        showAnyOption={false}
        selected={String(manga.isCompleted)}
        onSelect={editManga("isCompleted")}
        block={block}
      />
      <LoopButton
        displayName={"Hidden"}
        options={["true", "false"]}
        showAnyOption={false}
        selected={String(manga.hidden)}
        onSelect={editManga("hidden")}
        block={block}
      />
    </div>
  );
};

BasicFields.propTypes = {
  manga: Proptypes.object.isRequired,
  editManga: Proptypes.func.isRequired,
  layout: Proptypes.oneOf(["column", "row"]).isRequired,
};

export default BasicFields;
