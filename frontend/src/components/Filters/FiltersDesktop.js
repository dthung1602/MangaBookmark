import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, Collapse, Button, Input, Affix } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

import FilterDropdown from "./FilterDropdown";
import { SHELVES, MG_STATUSES, SORTABLE_FIELDS } from "../../utils/constants";
import { useOnScreenScrollVertically } from "../../hooks";
import "./FiltersDesktop.less";
import { GlobalContext } from "../GlobalContext";

const { Panel } = Collapse;

const onMoveUp = () => document.querySelector(".filter-container .ant-affix")?.classList.add("offset");
const onMoveDown = () => document.querySelector(".filter-container .ant-affix")?.classList.remove("offset");

const FiltersDesktop = ({ filters, updateFilters }) => {
  const [open, setOpen] = useState(false);
  const [{ supportedSites }] = useContext(GlobalContext);

  useOnScreenScrollVertically(onMoveUp, onMoveDown);

  const select = (field) => (value) => {
    updateFilters({ [field]: value });
  };

  return (
    <Affix className="filter-container">
      <div className="filter-basic">
        <FilterDropdown displayName={"Shelf"} options={SHELVES} selected={filters.shelf} onSelect={select("shelf")} />
        <FilterDropdown
          displayName={"Status"}
          options={MG_STATUSES}
          selected={filters.status}
          onSelect={select("status")}
        />
        <FilterDropdown
          displayName={"Sort"}
          options={SORTABLE_FIELDS}
          selected={filters.sort}
          onSelect={select("sort")}
          showALlOption={false}
        />

        <Input
          prefix={<SearchOutlined />}
          placeholder="Search ..."
          onPressEnter={(e) => updateFilters({ search: e.target.value })}
          defaultValue={filters.search}
        />
        <div className="flex-1" />
        <Button className="advance-btn" icon={<FilterOutlined />} onClick={() => setOpen(!open)}>
          {open ? "Simple" : "Advance"}
        </Button>
      </div>

      <Collapse bordered={false} activeKey={open ? 1 : undefined}>
        <Panel header={""} key="1" showArrow={false} className="filter-advance">
          <FilterDropdown
            displayName={"Site"}
            options={supportedSites.map((site) => site.name)}
            selected={filters.site}
            onSelect={select("site")}
          />
          <Dropdown overlay={<div>s</div>} placement="bottomCenter" arrow>
            <Button>bottomCenter</Button>
          </Dropdown>
          <Dropdown overlay={<div>s</div>} placement="bottomCenter" arrow>
            <Button>bottomCenter</Button>
          </Dropdown>
          <Dropdown overlay={<div>s</div>} placement="bottomCenter" arrow>
            <Button>bottomCenter</Button>
          </Dropdown>
        </Panel>
      </Collapse>
    </Affix>
  );
};

FiltersDesktop.propTypes = {
  filters: PropTypes.object,
  updateFilters: PropTypes.func,
};

export default FiltersDesktop;
