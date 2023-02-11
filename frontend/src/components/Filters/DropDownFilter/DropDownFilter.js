import PropTypes from "prop-types";
import { Button, Dropdown, Menu } from "antd";

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
  placement = "bottomCenter",
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
    ...(showAnyOption ? [<Menu.Item key={anyOptionValue}>{anyText}</Menu.Item>] : []),
    ...Object.entries(options).map(([key, value]) => (
      <Menu.Item key={key} className={size}>
        {value}
      </Menu.Item>
    )),
  ];

  return (
    <Dropdown
      menu={
        <div className="filter-dropdown-menu">
          <Menu onSelect={onSelectWrapper} selectedKeys={[selected]} items={menuItems} />
        </div>
      }
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
  placement: PropTypes.oneOf(["bottomLeft", "bottomCenter", "bottomRight", "topLeft", "topCenter", "topRight"]),
  block: PropTypes.bool,
};

export default DropDownFilter;
