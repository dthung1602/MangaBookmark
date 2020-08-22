import React, { useState } from "react";
import Proptypes from "prop-types";
import { Typography, Empty, Modal } from "antd";

import "./RightPanel.less";
import { disableBackgroundScrolling } from "../../utils";
import { useOnScreenScrollVertically } from "../../hooks";

const { Title } = Typography;

const addNavbarHiddenClass = () => {
  const rightPanel = document.getElementById("right-panel");
  if (rightPanel) {
    rightPanel.classList.add("navbar-hidden");
  }
};

const removeNavbarHiddenClass = () => {
  const rightPanel = document.getElementById("right-panel");
  if (rightPanel) {
    rightPanel.classList.remove("navbar-hidden");
  }
};

const RightPanel = ({ manga }) => {
  const [openImg, setOpenImg] = useState(false);

  disableBackgroundScrolling(openImg);

  useOnScreenScrollVertically(removeNavbarHiddenClass, addNavbarHiddenClass);

  if (manga === null) {
    return (
      <div id="right-panel">
        <br /> <br /> <br />
        <Empty description="Click a row to view detail" />
      </div>
    );
  }

  return (
    <div id="right-panel">
      <div className="cover">
        <img src={manga.image} alt={manga.name} onClick={() => setOpenImg(true)} />
      </div>
      <Title level={3}>
        <a href={manga.link} rel="noopener noreferrer">
          {manga.name}
        </a>
      </Title>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div style={{ background: "red" }}>hello</div>
      <Modal visible={openImg} footer={null} onCancel={() => setOpenImg(false)}>
        <img className="right-panel-cover-large" src={manga.image} alt={manga.name} />
      </Modal>
    </div>
  );
};

RightPanel.propTypes = {
  manga: Proptypes.object.isRequired,
};

export default RightPanel;
