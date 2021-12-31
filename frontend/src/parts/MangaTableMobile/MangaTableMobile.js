import { useContext } from "react";

import { Card, Empty, Skeleton } from "antd";

import MangaCard from "./MangaCard";
import { MangaListContext } from "../../contexts";
import { useDisplayMangas } from "../../hooks";
import "./MangaTableMobile.less";

const MangaTableMobile = () => {
  const { updateMangaDone, deleteMangaDone, editMangaDone } = useContext(MangaListContext);
  const dataSource = useDisplayMangas();

  return (
    <div className="manga-table-mobile">
      {dataSource.length === 0 ? <Empty /> : null}
      {dataSource.map((manga) => {
        if (manga.isSkeleton) {
          return (
            <Card>
              <Skeleton active key={manga._id} />
            </Card>
          );
        }
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
