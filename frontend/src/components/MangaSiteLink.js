import PropTypes from "prop-types";

const style = {
  color: "inherit",
};

function MangaSiteLink({ mangaSite }) {
  return (
    <a href={mangaSite.homepage} style={style} target="_blank" rel="noreferrer noopener">
      {mangaSite.name} {mangaSite.lang === "vi" ? "🇻🇳" : "🇬🇧"}
    </a>
  );
}

MangaSiteLink.propTypes = {
  mangaSite: PropTypes.object.isRequired,
};

export default MangaSiteLink;
