import PropTypes from "prop-types";
import { Button, Dropdown } from "antd";

import { ANY } from "../../../utils/constants";
import "./DropDownFilter.less";

const DropDownFilter = ({
  options,
  selected,
  displayName,
  onSelect,
  showAnyOption = true,
  anyOptionValue = ANY,
  anyText = "--",
  size = "default",
  placement = "bottom",
  block = false,
}) => {
  const onSelectWrapper = ({ key }) => onSelect(key);

  // convert array to object format
  if (Array.isArray(options)) {
    const obj = {};
    options.forEach((opt) => (obj[opt] = opt));
    options = obj;
  }

  const menuItems = [
    ...(showAnyOption ? [{ key: anyOptionValue, label: anyText }] : []),
    ...Object.entries(options).map(([key, value]) => ({ key, label: value })),
  ];

  return (
    <Dropdown
      menu={{ items: menuItems, onClick: onSelectWrapper }}
      trigger={["hover", "click"]}
      overlayClassName="box-shadow"
      placement={placement}
      arrow
    >
      <Button size={size} block={block}>
        <b>{displayName}: </b>
        {options[selected] || (showAnyOption ? anyText : "")}
      </Button>
    </Dropdown>
  );
};

DropDownFilter.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  showAnyOption: PropTypes.bool,
  anyOptionValue: PropTypes.any,
  anyText: PropTypes.node,
  size: PropTypes.oneOf(["small", "default", "large"]),
  placement: PropTypes.oneOf(["bottomLeft", "bottom", "bottomRight", "topLeft", "top", "topRight"]),
  block: PropTypes.bool,
};

export default DropDownFilter;
