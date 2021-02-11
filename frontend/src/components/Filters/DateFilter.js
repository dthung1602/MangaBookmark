import PropTypes from "prop-types";
import moment from "moment";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const DateFilter = ({ displayName, value, onSelect }) => {
  value = [value[0] ? moment.utc(value[0]) : value[0], value[1] ? moment.utc(value[1]) : value[1]];

  return (
    <div className="ant-btn filter-btn date-picker">
      <b>{displayName}:</b>
      <RangePicker value={value} onChange={onSelect} size="small" allowEmpty={[true, true]} bordered={false} />
    </div>
  );
};

DateFilter.propTypes = {
  value: PropTypes.array.isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DateFilter;
