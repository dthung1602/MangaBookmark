import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Collapse, Button, Input, Affix } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

import { useOnScreenScrollVertically } from "../../hooks";

const { Panel } = Collapse;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const Filters = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);
  filters.shelf = "reading";
  filters.status = "completed";
  filters.sort = "+name";

  useOnScreenScrollVertically(
    () => document.querySelector(".filter-container .ant-affix")?.classList.add("offset"),
    () => document.querySelector(".filter-container .ant-affix")?.classList.remove("offset"),
  );

  return (
    <Affix className="filter-container">
      <div className="filter-basic">
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button>Shelf: {filters.shelf}</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button>Status: {filters.status}</Button>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button>Sort: {filters.sort}</Button>
        </Dropdown>
        <Input prefix={<SearchOutlined />} placeholder="Search ..." />
        <div className="flex-1" />
        <Button className="advance-btn" icon={<FilterOutlined />} onClick={() => setOpen(!open)}>
          {open ? "Simple" : "Advance"}
        </Button>
      </div>
      <Collapse bordered={false} activeKey={open ? 1 : undefined}>
        <Panel header={""} key="1" showArrow={false} className="filter-advance">
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>bottomCenter</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>bottomCenter</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>bottomCenter</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>bottomCenter</Button>
          </Dropdown>
        </Panel>
      </Collapse>
    </Affix>
  );
};

Filters.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
};

export default Filters;
