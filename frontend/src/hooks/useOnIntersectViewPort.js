import { useEffect } from "react";

function useOnIntersectViewPort(ref, onIntersect, options = {}) {
  useEffect(() => {
    // guard against first call. See https://stackoverflow.com/a/53385264/7342188
    let firstCall = true;

    const observer = new IntersectionObserver(() => {
      if (firstCall) {
        firstCall = false;
      } else {
        onIntersect();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, onIntersect, options]);
}

export default useOnIntersectViewPort;
