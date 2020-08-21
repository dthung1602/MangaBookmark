import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Menu } from "antd";

import { ANY } from "../../utils/constants";
import "./FilterDropdown.less";

const FilterDropdown = ({
  options,
  selected,
  displayName,
  onSelect,
  showAnyOption = true,
  anyOptionValue = ANY,
  anyText = "--",
}) => {
  const onSelectWrapper = ({ key }) => onSelect(key);

  // convert array to object format
  if (Array.isArray(options)) {
    const obj = {};
    options.forEach((opt) => (obj[opt] = opt));
    options = obj;
  }

  // the <> is absolutely necessary
  return (
    <Dropdown
      overlay={
        <div className="filter-dropdown-menu">
          <Menu onSelect={onSelectWrapper} selectedKeys={[selected]}>
            {showAnyOption ? <Menu.Item key={anyOptionValue}>{anyText}</Menu.Item> : null}
            {Object.entries(options).map(([key, value]) => (
              <Menu.Item key={key}>{value}</Menu.Item>
            ))}
          </Menu>
        </div>
      }
      trigger={["hover", "click"]}
      className="filter-btn"
      overlayClassName="box-shadow"
      placement="bottomCenter"
      arrow
    >
      <Button>
        <b>{displayName}: </b>
        {options[selected] || (showAnyOption ? anyText : "")}
      </Button>
    </Dropdown>
  );
};

FilterDropdown.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  showAnyOption: PropTypes.bool,
  anyOptionValue: PropTypes.any,
  anyText: PropTypes.node,
};

export default FilterDropdown;
