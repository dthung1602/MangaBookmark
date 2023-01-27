import { Card, Empty, Skeleton } from "antd";

import MangaCard from "./MangaCard";
import { useDisplayMangas } from "../../hooks";
import "./MangaTableMobile.less";

const MangaTableMobile = () => {
  const dataSource = useDisplayMangas();

  return (
    <div className="manga-table-mobile">
      {dataSource.length === 0 ? <Empty /> : null}
      {dataSource.map((manga) => {
        if (manga.isSkeleton) {
          return (
            <Card key={manga._id}>
              <Skeleton active key={manga._id} />
            </Card>
          );
        }
        return <MangaCard key={manga._id} manga={manga} />;
      })}
    </div>
  );
};

export default MangaTableMobile;
