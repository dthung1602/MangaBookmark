import { useState, useEffect } from "react";

import { randomFrom } from "../utils";
import loadingGIFs from "../assets/loading";

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
