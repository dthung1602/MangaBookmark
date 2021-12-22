import { useState } from "react";
import PropTypes from "prop-types";

import { Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import "./CopyLinkButton.less";

const CopyLinkButton = ({ link }) => {
  const [tooltipText, setTooltipText] = useState("Copy link");

  const copyText = () => {
    window.navigator.clipboard.writeText(link).then(() => setTooltipText("Copied to clipboard"));
  };
  const onVisibleChange = (visible) => {
    if (!visible) {
      setTooltipText("Copy link");
    }
  };
  return (
    <Tooltip title={tooltipText} className="copy-link-btn" onClick={copyText} onVisibleChange={onVisibleChange}>
      <LinkOutlined />
    </Tooltip>
  );
};

CopyLinkButton.propTypes = {
  link: PropTypes.string.isRequired,
};

export default CopyLinkButton;
