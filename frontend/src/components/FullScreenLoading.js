import { useState, useEffect } from "react";

import { randomFrom } from "../utils";

import aqua from "../assets/loading/aqua.gif";
import darkness from "../assets/loading/darkness.gif";
import kazuma from "../assets/loading/kazuma.gif";
import megumin from "../assets/loading/megumin.gif";

const loadingGIFs = [aqua, darkness, kazuma, megumin];

const FullScreenLoading = () => {
  const [img, setImg] = useState(randomFrom(loadingGIFs));

  useEffect(() => {
    const replaceImg = () => {
      setImg(randomFrom(loadingGIFs));
    };
    setTimeout(replaceImg, 3000);
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fcfdfb",
      }}
    >
      <img src={img} alt="" />
      <h3>Loading ...</h3>
    </div>
  );
};

export default FullScreenLoading;
