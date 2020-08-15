import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Menu } from "antd";

import { ALL } from "../../utils/constants";

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

  // the <> is absolute necessary
  return (
    <Dropdown
      overlay={
        <>
          <Menu onSelect={onSelectWrapper} selectedKeys={[selected]}>
            {showALlOption ? <Menu.Item key={allOptionValue}>{allText}</Menu.Item> : null}
            {Object.entries(options).map(([key, value]) => (
              <Menu.Item key={key}>{value}</Menu.Item>
            ))}
          </Menu>
        </>
      }
      overlayClassName="box-shadow"
      placement="bottomCenter"
      arrow
    >
      <Button>
        <b className="filter-text">{displayName}: </b>
        {options[selected] || (showALlOption ? allText : "")}
      </Button>
    </Dropdown>
  );
};

FilterDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  showALlOption: PropTypes.bool,
  allOptionValue: PropTypes.any,
  allText: PropTypes.node,
};

export default FilterDropdown;
