import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Affix, Button, Collapse, Grid, Input } from "antd";
import { CaretDownOutlined, CaretUpOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";

import FilterDropdown from "./FilterDropdown";
import LoopButton from "./LoopButton";
import DateFilter from "./DateFilter";
import { GlobalContext } from "../GlobalContext";
import { MG_STATUSES, SHELVES, SORTABLE_FIELDS, LANGUAGES } from "../../utils/constants";
import "./Filters.less";

const { Panel } = Collapse;
const { useBreakpoint } = Grid;

const Filters = ({ filters, updateFilters, resetFilters }) => {
  const [open, setOpen] = useState(false);
  const [{ supportedSites }] = useContext(GlobalContext);

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
  const languageFilter = (
    <FilterDropdown
      key="lang"
      displayName={"Language"}
      options={LANGUAGES}
      selected={filters.lang}
      onSelect={select("lang")}
    />
  );

  const breakpoints = useBreakpoint();
  let basicFilters, advanceFilters;

  if (breakpoints.md) {
    basicFilters = [shelfFilter, statusFilter, sort, search];
    advanceFilters = [
      <div key={1} className="flex">
        {[isCompletedFilter, hiddenFilter, siteFilter, languageFilter]}
      </div>,
      <div key={2} className="flex">
        {[createdAtFilter, lastReleasedFilter]}
      </div>,
    ];
  } else if (breakpoints.sm) {
    basicFilters = [shelfFilter, statusFilter, search];
    advanceFilters = [
      sort,
      isCompletedFilter,
      hiddenFilter,
      siteFilter,
      languageFilter,
      createdAtFilter,
      lastReleasedFilter,
    ];
  } else {
    basicFilters = [shelfFilter];
    advanceFilters = [
      sort,
      statusFilter,
      isCompletedFilter,
      hiddenFilter,
      siteFilter,
      languageFilter,
      createdAtFilter,
      lastReleasedFilter,
      search,
    ];
  }

  return (
    <Affix className="affix-container">
      <div className="filter-basic">
        {basicFilters}
        <div className="flex-1" />
        <Button className="clear-btn" type="text" icon={<ClearOutlined />} onClick={resetFilters}>
          Clear
        </Button>
        <Button
          className="advance-btn"
          icon={open ? <CaretUpOutlined /> : <CaretDownOutlined />}
          onClick={() => setOpen(!open)}
        >
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
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};

export default Filters;
