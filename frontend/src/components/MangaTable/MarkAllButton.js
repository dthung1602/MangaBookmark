import { Spin, Tooltip } from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import "./MarkAllButton.less";

const MarkAllButton = ({ markAll, disabled, isLoading }) => {
  return (
    <Tooltip title="Mark all as read" placement="bottom">
      <div className={`mark-all-btn ${disabled ? "disabled" : ""}`} onClick={markAll}>
        {isLoading ? <Spin indicator={<LoadingOutlined />} /> : <CheckOutlined />}
      </div>
    </Tooltip>
  );
};

MarkAllButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  markAll: PropTypes.func.isRequired,
};

export default MarkAllButton;
