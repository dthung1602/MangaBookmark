import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Collapse, Button, Input, Affix, DatePicker } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

import FilterDropdown from "./FilterDropdown";
import LoopButton from "./LoopButton";
import { SHELVES, MG_STATUSES, SORTABLE_FIELDS } from "../../utils/constants";
import { useOnScreenScrollVertically } from "../../hooks";
import { GlobalContext } from "../GlobalContext";
import "./FiltersDesktop.less";

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const onMoveUp = () => document.querySelector(".filter-container .ant-affix")?.classList.add("offset");
const onMoveDown = () => document.querySelector(".filter-container .ant-affix")?.classList.remove("offset");

const FiltersDesktop = ({ filters, updateFilters }) => {
  const [open, setOpen] = useState(false);
  const [{ supportedSites }] = useContext(GlobalContext);

  useOnScreenScrollVertically(onMoveUp, onMoveDown);

  const { createdAtGTE, createdAtLTE, lastReleasedGTE, lastReleasedLTE } = filters;
  const createdAt = [
    createdAtGTE ? moment.utc(createdAtGTE) : createdAtGTE,
    createdAtLTE ? moment.utc(createdAtLTE) : createdAtLTE,
  ];
  const lastReleased = [
    lastReleasedGTE ? moment.utc(lastReleasedGTE) : lastReleasedGTE,
    lastReleasedLTE ? moment.utc(lastReleasedLTE) : lastReleasedLTE,
  ];

  const select = (field) => (value) => {
    updateFilters({ [field]: value });
  };

  const selectDateRange = (field) => (dates, dateStrings) => {
    updateFilters({
      [field + "GTE"]: dateStrings[0],
      [field + "LTE"]: dateStrings[1],
    });
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
        <LoopButton
          displayName={"Completed"}
          options={["true", "false"]}
          selected={filters.isCompleted}
          onSelect={select("isCompleted")}
        />
        <FilterDropdown
          displayName={"Sort"}
          options={SORTABLE_FIELDS}
          selected={filters.sort}
          onSelect={select("sort")}
          showAnyOption={false}
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
          <LoopButton
            displayName={"Hidden"}
            options={["true", "false"]}
            selected={filters.hidden}
            onSelect={select("hidden")}
          />
          <FilterDropdown
            displayName={"Site"}
            options={supportedSites.map((site) => site.name)}
            selected={filters.site}
            onSelect={select("site")}
          />
          <div className="ant-btn date-picker">
            <b>Created:</b>
            <RangePicker
              value={createdAt}
              onChange={selectDateRange("createdAt")}
              size="small"
              allowEmpty={[true, true]}
              bordered={false}
            />
          </div>
          <div className="ant-btn date-picker">
            <b>Last released:</b>
            <RangePicker
              value={lastReleased}
              onChange={selectDateRange("lastReleased")}
              size="small"
              allowEmpty={[true, true]}
              bordered={false}
            />
          </div>
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
