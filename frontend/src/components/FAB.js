import React, { useState, useRef } from "react";
import { Button, Tooltip } from "antd";
import { PlusOutlined, UpOutlined, FileAddOutlined, ReloadOutlined } from "@ant-design/icons";

import NewMangaModal from "./NewMangaModal";
import { useOnClickOutside } from "../hooks";
import { disableBackgroundScrolling } from "../utils";
import "./FAB.less";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const FAB = () => {
  const [newMangaModalOpen, setNewMangaModalOpen] = useState(false);
  const [showExpandBtns, setShowExpandBtns] = useState(false);
  const containerRef = useRef(null);

  const show = () => {
    setShowExpandBtns(true);
  };

  const hide = () => {
    setShowExpandBtns(false);
  };

  const toggleExpandBtns = () => (showExpandBtns ? hide() : show());

  useOnClickOutside(containerRef, hide);

  disableBackgroundScrolling(newMangaModalOpen);

  const containerClass = `fab-container ${showExpandBtns ? "hover" : ""}`;
  const handleExpandBtnClickWrapper = (func) => {
    if (!showExpandBtns) {
      return undefined;
    }
    return () => {
      func();
      hide();
    };
  };

  return (
    <div ref={containerRef} className={containerClass} onMouseLeave={hide}>
      <Tooltip placement="left" visible={showExpandBtns} title="Back to top" overlayClassName="fab-tooltip-overlay">
        <Button
          shape="circle"
          type="primary"
          className="fab-expand-btn"
          icon={<UpOutlined />}
          onClick={handleExpandBtnClickWrapper(scrollToTop)}
        />
      </Tooltip>
      <Tooltip placement="left" visible={showExpandBtns} title="Update mangas" overlayClassName="fab-tooltip-overlay">
        <Button
          shape="circle"
          type="primary"
          className="fab-expand-btn"
          icon={<ReloadOutlined />}
          onClick={handleExpandBtnClickWrapper(() => alert("button2"))}
        />
      </Tooltip>
      <Tooltip placement="left" visible={showExpandBtns} title="New manga" overlayClassName="fab-tooltip-overlay">
        <Button
          shape="circle"
          type="primary"
          className="fab-expand-btn"
          icon={<FileAddOutlined />}
          onClick={handleExpandBtnClickWrapper(() => setNewMangaModalOpen(true))}
        />
      </Tooltip>
      <Button
        shape="circle"
        type="primary"
        size="large"
        className="fab-root-btn"
        icon={<PlusOutlined />}
        onClick={toggleExpandBtns}
        onMouseEnter={show}
      />
      <NewMangaModal open={newMangaModalOpen} onCancel={() => setNewMangaModalOpen(false)} />
    </div>
  );
};

export default FAB;
