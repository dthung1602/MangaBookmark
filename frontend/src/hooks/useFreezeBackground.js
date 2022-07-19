import { useEffect } from "react";

const useFreezeBackground = (freeze) => {
  useEffect(() => {
    document.body.style.overflow = freeze ? "hidden" : "unset";
  }, [freeze]);
};

export default useFreezeBackground;
