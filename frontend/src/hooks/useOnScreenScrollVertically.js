import { useEffect } from "react";

function useOnScreenScrollVertically(onMoveUp, onMoveDown) {
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const showHideNavBar = () => {
      if (window.pageYOffset < prevScrollPos) {
        onMoveUp();
      } else {
        onMoveDown();
      }
      prevScrollPos = window.pageYOffset;
    };
    window.addEventListener("scroll", showHideNavBar);
    return () => {
      window.removeEventListener("scroll", showHideNavBar);
    };
  });
}

export default useOnScreenScrollVertically;
