import PropTypes from "prop-types";
import { Button } from "antd";
import { ANY } from "../../utils/constants";

const LoopButton = ({
  options,
  selected,
  displayName,
  onSelect,
  showAnyOption = true,
  anyOptionValue = ANY,
  anyText = "--",
  size = "default",
  block = false,
}) => {
  // convert array to object format
  if (Array.isArray(options)) {
    const obj = {};
    options.forEach((opt) => (obj[opt] = opt));
    options = obj;
  }

  const keys = Object.keys(options);
  if (showAnyOption) {
    keys.push(anyOptionValue);
  }
  const nextValue = keys[(keys.indexOf(selected) + 1) % keys.length];

  return (
    <Button className="filter-btn" size={size} onClick={() => onSelect(nextValue)} block={block}>
      <b>{displayName}: </b>
      {options[selected] || (showAnyOption ? anyText : "")}
    </Button>
  );
};

LoopButton.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  showAnyOption: PropTypes.bool,
  anyOptionValue: PropTypes.any,
  anyText: PropTypes.node,
  size: PropTypes.oneOf(["small", "default", "large"]),
  block: PropTypes.bool,
};

export default LoopButton;
