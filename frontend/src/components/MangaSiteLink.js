import { useContext } from "react";
import PropTypes from "prop-types";

import { GlobalContext } from "./GlobalContext";

const style = {
  color: "inherit",
};

const unknownSite = {
  name: "Unknown",
  homepage: "",
  lang: "en",
};

function MangaSiteLink({ mangaSiteName }) {
  const [{ supportedSites }] = useContext(GlobalContext);
  const mangaSite = supportedSites.find((site) => site.name === mangaSiteName) || unknownSite;

  return (
    <a href={mangaSite.homepage} style={style} target="_blank" rel="noreferrer noopener">
      {mangaSite.name} {mangaSite.lang === "vi" ? "🇻🇳" : "🇬🇧"}
    </a>
  );
}

MangaSiteLink.propTypes = {
  mangaSiteName: PropTypes.string.isRequired,
};

export default MangaSiteLink;
