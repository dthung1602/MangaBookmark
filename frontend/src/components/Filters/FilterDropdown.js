import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Menu } from "antd";

import { ALL } from "../../utils/constants";
import "./FilterDropdown.less";

const FilterDropdown = ({
  options,
  selected,
  displayName,
  onSelect,
  showALlOption = true,
  allOptionValue = ALL,
  allText = "All",
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
            {showALlOption ? <Menu.Item key={allOptionValue}>{allText}</Menu.Item> : null}
            {Object.entries(options).map(([key, value]) => (
              <Menu.Item key={key}>{value}</Menu.Item>
            ))}
          </Menu>
        </div>
      }
      overlayClassName="box-shadow"
      placement="bottomCenter"
      arrow
    >
      <Button>
        <b>{displayName}: </b>
        {options[selected] || (showALlOption ? allText : "")}
      </Button>
    </Dropdown>
  );
};

FilterDropdown.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  showALlOption: PropTypes.bool,
  allOptionValue: PropTypes.any,
  allText: PropTypes.node,
};

export default FilterDropdown;
