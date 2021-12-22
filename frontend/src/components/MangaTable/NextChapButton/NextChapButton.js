import { useState } from "react";

import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

import { DOUBLE_CLICK_DELAY } from "../../../utils/constants";
import { truncString } from "../../../utils";
import "./NextChapButton.less";

const NextChapToRead = ({ nextChapToRead, markOne }) => {
  const [doubleClickFlag, setDoubleClickFlag] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    if (doubleClickFlag) {
      markOne(nextChapToRead);
    } else {
      setDoubleClickFlag(true);
      setTimeout(() => {
        setDoubleClickFlag(false);
        window.open(nextChapToRead.link, "_blank");
      }, DOUBLE_CLICK_DELAY);
    }
  };

  const tooltipTitle = (
    <>
      Single click to read
      <br />
      Double click to mark & read
    </>
  );

  return (
    <Tooltip title={tooltipTitle} placement="bottom">
      <a className={`next-chap-btn ${nextChapToRead.empty ? "empty" : ""}`} href="" onClick={onClick}>
        {truncString(nextChapToRead.name, 25)} &nbsp;&nbsp; <DoubleRightOutlined />
      </a>
    </Tooltip>
  );
};

NextChapToRead.propTypes = {
  nextChapToRead: PropTypes.object.isRequired,
  markOne: PropTypes.func.isRequired,
};

export default NextChapToRead;
