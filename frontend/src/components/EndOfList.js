import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Ref:
 * - https://www.pluralsight.com/guides/how-to-implement-infinite-scrolling-with-reactjs
 * - https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 * - https://stackoverflow.com/questions/56541342/react-hooks-why-is-current-null-for-useref-hook
 */
function EndOfList({ onReached, disabled }) {
  const prevY = useRef(0);
  const target = useRef(null);

  useEffect(() => {
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

  return <div ref={target} />;
}

EndOfList.propTypes = {
  onReached: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndOfList;
