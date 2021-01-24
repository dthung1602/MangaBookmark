import React, { useState } from "react";
import PropTypes from "prop-types";
import { DoubleRightOutlined } from "@ant-design/icons";

import { DOUBLE_CLICK_DELAY } from "../../utils/constants";
import { truncString } from "../../utils";
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

  return (
    <a className={`next-chap-btn ${nextChapToRead.empty ? "empty" : ""}`} href="" onClick={onClick}>
      {truncString(nextChapToRead.name, 35)} &nbsp;&nbsp; <DoubleRightOutlined />
    </a>
  );
};

NextChapToRead.propTypes = {
  nextChapToRead: PropTypes.object.isRequired,
  markOne: PropTypes.func.isRequired,
};

export default NextChapToRead;
