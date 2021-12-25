import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import { PlusOutlined, ReloadOutlined, UpOutlined, AppstoreOutlined, FileTextOutlined } from "@ant-design/icons";

import { useOnClickOutside } from "../../hooks";
import { scrollToTop } from "../../utils";
import "./FAB.less";

const FAB = ({ openNewMangaModal, isUpdatingMangas, updateMangas, openUserNote }) => {
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

  const containerClass = `fab-container ${showExpandBtns ? "hover" : ""}`;
  const handleExpandBtnClickWrapper = (func) => {
    if (!showExpandBtns) {
      return;
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
          size="large"
          type="primary"
          className="fab-expand-btn"
          icon={<UpOutlined />}
          onClick={handleExpandBtnClickWrapper(scrollToTop)}
        />
      </Tooltip>
      <Tooltip placement="left" visible={showExpandBtns} title="Update mangas" overlayClassName="fab-tooltip-overlay">
        <Button
          shape="circle"
          size="large"
          type="primary"
          className="fab-expand-btn"
          loading={isUpdatingMangas}
          icon={<ReloadOutlined />}
          onClick={handleExpandBtnClickWrapper(updateMangas)}
        />
      </Tooltip>
      <Tooltip placement="left" visible={showExpandBtns} title="Note" overlayClassName="fab-tooltip-overlay">
        <Button
          shape="circle"
          size="large"
          type="primary"
          className="fab-expand-btn"
          icon={<FileTextOutlined />}
          onClick={handleExpandBtnClickWrapper(openUserNote)}
        />
      </Tooltip>
      <Tooltip placement="left" visible={showExpandBtns} title="New manga" overlayClassName="fab-tooltip-overlay">
        <Button
          shape="circle"
          size="large"
          type="primary"
          className="fab-expand-btn"
          icon={<PlusOutlined />}
          onClick={handleExpandBtnClickWrapper(openNewMangaModal)}
        />
      </Tooltip>
      <Button
        shape="circle"
        type="primary"
        size="large"
        className="fab-root-btn"
        icon={<AppstoreOutlined />}
        onClick={toggleExpandBtns}
        onMouseEnter={show}
      />
    </div>
  );
};

FAB.propTypes = {
  openNewMangaModal: PropTypes.func.isRequired,
  updateMangas: PropTypes.func.isRequired,
  isUpdatingMangas: PropTypes.bool.isRequired,
  openUserNote: PropTypes.func.isRequired,
};

export default FAB;
