import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Ref:
 * - https://www.pluralsight.com/guides/how-to-implement-infinite-scrolling-with-reactjs
 * - https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 * - https://stackoverflow.com/questions/56541342/react-hooks-why-is-current-null-for-useref-hook
 */
function EndOfList({ onReached, disabled = false, yOffset = 300 }) {
  const prevY = useRef(0);
  const target = useRef(null);

  useEffect(() => {
    if (!target.current) {
      return;
    }

    const observer = new IntersectionObserver(() => {
      const { y } = target.current.getBoundingClientRect();
      if (prevY.current > y && !disabled) {
        onReached();
      }
      prevY.current = y;
    });

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [onReached, disabled, prevY, target]);

  const style = {
    position: "relative",
    bottom: `${yOffset}px`,
  };

  return <div ref={target} style={style} />;
}

EndOfList.propTypes = {
  onReached: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  yOffset: PropTypes.number,
};

export default EndOfList;
