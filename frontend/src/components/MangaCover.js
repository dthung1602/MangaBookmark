import { useState } from "react";
import PropTypes from "prop-types";

import { Image } from "antd";
import { ImageAPI } from "../api";
import FALLBACK_IMG from "../assets/fallback-manga-cover.webp";

const MangaCover = ({ src: originalSrc, mangaSite, ...props }) => {
  const [src, setSrc] = useState(originalSrc);

  const onError =
    src === FALLBACK_IMG
      ? null
      : async () => {
          try {
            const srcHost = new URL(src).host;
            if (srcHost !== window.location.host) {
              setSrc(ImageAPI.constructImageProxyURL(src, mangaSite));
            } else {
              setSrc(FALLBACK_IMG);
            }
          } catch {
            setSrc(FALLBACK_IMG);
          }
        };

  if (src === FALLBACK_IMG) {
    props.preview = false;
  }

  return <Image {...props} src={src} onError={onError} />;
};

MangaCover.propTypes = {
  src: PropTypes.string.isRequired,
  mangaSite: PropTypes.string.isRequired,
};

export default MangaCover;
