import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Affix, Button, Collapse, Input, Grid } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

import FilterDropdown from "./FilterDropdown";
import LoopButton from "./LoopButton";
import DateFilter from "./DateFilter";
import { useOnScreenScrollVertically } from "../../hooks";
import { GlobalContext } from "../GlobalContext";
import { MG_STATUSES, SHELVES, SORTABLE_FIELDS } from "../../utils/constants";
import "./Filters.less";

const { Panel } = Collapse;
const { useBreakpoint } = Grid;

const onMoveUp = () => document.querySelector(".filter-container .ant-affix")?.classList.add("offset");
const onMoveDown = () => document.querySelector(".filter-container .ant-affix")?.classList.remove("offset");

const Filters = ({ filters, updateFilters }) => {
  const [open, setOpen] = useState(false);
  const [{ supportedSites }] = useContext(GlobalContext);

  useOnScreenScrollVertically(onMoveUp, onMoveDown);

  const select = (field) => (value) => {
    updateFilters({ [field]: value });
  };

  const selectDateRange = (field) => (dates, dateStrings) => {
    updateFilters({
      [field + "GTE"]: dateStrings[0],
      [field + "LTE"]: dateStrings[1],
    });
  };

  const shelfFilter = (
    <FilterDropdown
      key="shelf"
      displayName={"Shelf"}
      options={SHELVES}
      selected={filters.shelf}
      onSelect={select("shelf")}
    />
  );
  const statusFilter = (
    <FilterDropdown
      key="status"
      displayName={"Status"}
      options={MG_STATUSES}
      selected={filters.status}
      onSelect={select("status")}
    />
  );
  const isCompletedFilter = (
    <LoopButton
      key="isCompleted"
      displayName={"Completed"}
      options={["true", "false"]}
      selected={filters.isCompleted}
      onSelect={select("isCompleted")}
    />
  );
  const sort = (
    <FilterDropdown
      key="sort"
      displayName={"Sort"}
      options={SORTABLE_FIELDS}
      selected={filters.sort}
      onSelect={select("sort")}
      showAnyOption={false}
    />
  );
  const search = (
    <Input
      key="search"
      className="filter-btn"
      prefix={<SearchOutlined />}
      placeholder="Search ..."
      onPressEnter={(e) => updateFilters({ search: e.target.value })}
      defaultValue={filters.search}
    />
  );
  const hiddenFilter = (
    <LoopButton
      key="hidden"
      displayName={"Hidden"}
      options={["true", "false"]}
      selected={filters.hidden}
      onSelect={select("hidden")}
    />
  );
  const siteFilter = (
    <FilterDropdown
      key="site"
      displayName={"Site"}
      options={supportedSites.map((site) => site.name)}
      selected={filters.site}
      onSelect={select("site")}
    />
  );
  const createdAtFilter = (
    <DateFilter
      key="createdAt"
      displayName={"Created"}
      onSelect={selectDateRange("createdAt")}
      value={[filters.createdAtGTE, filters.createdAtLTE]}
    />
  );
  const lastReleasedFilter = (
    <DateFilter
      key="lastReleased"
      displayName={"Last released"}
      onSelect={selectDateRange("lastReleased")}
      value={[filters.lastReleasedGTE, filters.lastReleasedLTE]}
    />
  );

  const breakpoints = useBreakpoint();
  let basicFilters, advanceFilters;

  if (breakpoints.md) {
    basicFilters = [shelfFilter, statusFilter, sort, search];
    advanceFilters = [
      <div key={1} className="flex">
        {[isCompletedFilter, hiddenFilter, siteFilter]}
      </div>,
      <div key={2} className="flex">
        {[createdAtFilter, lastReleasedFilter]}
      </div>,
    ];
  } else if (breakpoints.sm) {
    basicFilters = [shelfFilter, statusFilter, search];
    advanceFilters = [sort, isCompletedFilter, hiddenFilter, siteFilter, createdAtFilter, lastReleasedFilter];
  } else {
    basicFilters = [shelfFilter];
    advanceFilters = [
      sort,
      statusFilter,
      isCompletedFilter,
      hiddenFilter,
      siteFilter,
      createdAtFilter,
      lastReleasedFilter,
      search,
    ];
  }

  return (
    <Affix className="filter-container">
      <div className="filter-basic">
        {basicFilters}
        <div className="flex-1" />
        <Button className="advance-btn" icon={<FilterOutlined />} onClick={() => setOpen(!open)}>
          {open ? "Simple" : "Advance"}
        </Button>
      </div>

      <Collapse bordered={false} activeKey={open ? 1 : undefined}>
        <Panel header={""} key="1" showArrow={false} className="filter-advance">
          {advanceFilters}
        </Panel>
      </Collapse>
    </Affix>
  );
};

Filters.propTypes = {
  filters: PropTypes.object,
  updateFilters: PropTypes.func,
};

export default Filters;
