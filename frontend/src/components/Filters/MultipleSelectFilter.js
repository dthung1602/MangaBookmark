import PropTypes from "prop-types";
import { Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "./MultipleSelectFilter.less";

const { Option } = Select;

const MultipleSelectFilter = ({ options, selected, displayName, onSelect, size = "default" }) => {
  // convert array to object format
  if (Array.isArray(options)) {
    const obj = {};
    options.forEach((opt) => (obj[opt] = opt));
    options = obj;
  }

  return (
    <Select
      className="filter-btn multiple-select"
      mode="multiple"
      allowClear
      placeholder={displayName}
      value={selected}
      size={size}
      suffixIcon={<SettingOutlined />}
      onChange={onSelect}
    >
      {Object.entries(options).map(([key, value]) => (
        <Option key={key} value={key}>
          {value}
        </Option>
      ))}
    </Select>
  );
};

MultipleSelectFilter.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "default", "large"]),
  block: PropTypes.bool,
};

export default MultipleSelectFilter;
