import { useContext } from "react";

import { MangaContext } from "../../contexts";
import "./MangaBanner.less";

const MangaBanner = () => {
  const { manga } = useContext(MangaContext);
  return (
    <div className="manga-banner">
      <div className="image-wrapper">
        <img src={manga?.image} alt="" />
      </div>
      <h1>{manga?.name}</h1>
    </div>
  );
};

export default MangaBanner;
