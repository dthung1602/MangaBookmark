import { Spin } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import "./MarkAllButton.less";

const MarkAllButton = ({ markAll, disabled, isLoading }) => {
  return (
    <div className={`mark-all-btn ${disabled ? "disabled" : ""}`} onClick={markAll}>
      {isLoading ? <Spin size="small" /> : <CheckOutlined />}
    </div>
  );
};

MarkAllButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  markAll: PropTypes.func.isRequired,
};

export default MarkAllButton;
