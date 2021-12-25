import { useContext } from "react";

import { Empty } from "antd";

import MangaCard from "./MangaCard";
import { MangaListContext } from "../../contexts";
import "./MangaTableMobile.less";

const MangaTableMobile = () => {
  // TODO skeleton loading logic
  const { mangasToShow, updateMangaDone, deleteMangaDone, editMangaDone } = useContext(MangaListContext);

  return (
    <div className="manga-table-mobile">
      {mangasToShow.length === 0 ? <Empty /> : null}
      {mangasToShow.map((manga) => {
        return (
          <MangaCard
            key={manga._id}
            manga={manga}
            editMangaDone={editMangaDone}
            updateMangaDone={updateMangaDone}
            deleteMangaDone={deleteMangaDone}
          />
        );
      })}
    </div>
  );
};

export default MangaTableMobile;
