import { useState } from "react";
import PropTypes from "prop-types";

import { ImageProxyAPI } from "../api";
import FALLBACK_IMG from "../assets/fallback-manga-cover.webp";

const MangaCover = ({ src: originalSrc, mangaSite, ...props }) => {
  const [src, setSrc] = useState(originalSrc);

  const onError =
    src === FALLBACK_IMG
      ? null
      : async () => {
          console.log(src);
          try {
            const srcHost = new URL(src).host;
            if (srcHost !== window.location.host) {
              setSrc(ImageProxyAPI.constructImageProxyURL(src, mangaSite));
            } else {
              setSrc(FALLBACK_IMG);
            }
          } catch {
            setSrc(FALLBACK_IMG);
          }
        };

  return <img {...props} src={src} onError={onError} />;
};

MangaCover.propTypes = {
  src: PropTypes.string.isRequired,
  mangaSite: PropTypes.mangaSite,
};

export default MangaCover;
