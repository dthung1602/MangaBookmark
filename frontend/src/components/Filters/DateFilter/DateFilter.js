import PropTypes from "prop-types";
import dayjs from "dayjs";
import { DatePicker, Button } from "antd";

import "./DateFilter.less";

const { RangePicker } = DatePicker;

const DateFilter = ({ displayName, value, onSelect }) => {
  value = [value[0] ? dayjs.utc(value[0]) : value[0], value[1] ? dayjs.utc(value[1]) : value[1]];

  return (
    <Button className="date-picker">
      <b>{displayName}:</b>
      <RangePicker value={value} onChange={onSelect} size="small" allowEmpty={[true, true]} bordered={false} />
    </Button>
  );
};

DateFilter.propTypes = {
  value: PropTypes.array.isRequired,
  displayName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DateFilter;
