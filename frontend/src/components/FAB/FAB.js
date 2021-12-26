import { useRef, useState } from "react";

import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import { useOnClickOutside } from "../../hooks";
import "./FAB.less";

const FAB = ({ config }) => {
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

  // Hide FAB entirely
  if (config === false) {
    return null;
  }

  // Only one action, no need for special effects
  if (config.length === 0) {
    return (
      <div ref={containerRef} className={containerClass}>
        <Tooltip key={config[0].title} placement="left" title={config[0].title} overlayClassName="fab-tooltip-overlay">
          <Button
            shape="circle"
            type="primary"
            size="large"
            className="fab-root-btn"
            icon={config[0].icon}
            onClick={config[0].onClick}
          />
        </Tooltip>
      </div>
    );
  }

  // Many actions -> only display them when mouse over
  return (
    <div ref={containerRef} className={containerClass} onMouseLeave={hide}>
      {config.map(({ title, icon, onClick }) => (
        <Tooltip
          key={title}
          placement="left"
          visible={showExpandBtns}
          title={title}
          overlayClassName="fab-tooltip-overlay"
        >
          <Button
            shape="circle"
            size="large"
            type="primary"
            className="fab-expand-btn"
            icon={icon}
            onClick={handleExpandBtnClickWrapper(onClick)}
          />
        </Tooltip>
      ))}
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
  config: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object).isRequired]),
};

export default FAB;
