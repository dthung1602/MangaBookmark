import { useContext, useState } from "react";

import PropTypes from "prop-types";
import { Affix, Space, Button, Collapse, Grid, Input } from "antd";
import { CaretDownOutlined, CaretUpOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";

import { DropDownFilter, LoopButtonFilter, DateFilter, MultipleSelectFilter } from "../Filters";
import { GlobalContext } from "../GlobalContext";
import { MG_STATUSES, SHELVES, SORTABLE_FIELDS, LANGUAGES } from "../../utils/constants";
import "./MangaFilters.less";

const { Panel } = Collapse;
const { useBreakpoint } = Grid;

const MangaFilters = ({ filters, updateFilters, resetFilters }) => {
  const [open, setOpen] = useState(false);
  const [{ supportedSites, availableTags }] = useContext(GlobalContext);

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
    <DropDownFilter
      key="shelf"
      displayName={"Shelf"}
      options={SHELVES}
      selected={filters.shelf}
      onSelect={select("shelf")}
    />
  );
  const statusFilter = (
    <DropDownFilter
      key="status"
      displayName={"Status"}
      options={MG_STATUSES}
      selected={filters.status}
      onSelect={select("status")}
    />
  );
  const isCompletedFilter = (
    <LoopButtonFilter
      key="isCompleted"
      displayName={"Completed"}
      options={["true", "false"]}
      selected={filters.isCompleted}
      onSelect={select("isCompleted")}
    />
  );
  const sort = (
    <DropDownFilter
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
    <LoopButtonFilter
      key="hidden"
      displayName={"Hidden"}
      options={["true", "false"]}
      selected={filters.hidden}
      onSelect={select("hidden")}
    />
  );
  const siteFilter = (
    <DropDownFilter
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
    <DropDownFilter
      key="lang"
      displayName={"Language"}
      options={LANGUAGES}
      selected={filters.lang}
      onSelect={select("lang")}
    />
  );
  const tagsFilter = (
    <MultipleSelectFilter
      key="tags"
      displayName={"Tags"}
      options={availableTags}
      selected={filters.tags}
      onSelect={select("tags")}
    />
  );

  const breakpoints = useBreakpoint();
  let basicFilters,
    advanceFilters,
    advanceFiltersSecondRows = [];

  console.log(breakpoints);

  if (breakpoints.xl) {
    basicFilters = [shelfFilter, statusFilter, sort, search];
    advanceFilters = [isCompletedFilter, hiddenFilter, siteFilter, languageFilter, tagsFilter];
    advanceFiltersSecondRows = [createdAtFilter, lastReleasedFilter];
  } else if (breakpoints.md) {
    basicFilters = [shelfFilter, statusFilter, sort, search];
    advanceFilters = [
      isCompletedFilter,
      hiddenFilter,
      siteFilter,
      languageFilter,
      tagsFilter,
      createdAtFilter,
      lastReleasedFilter,
    ];
  } else if (breakpoints.sm) {
    basicFilters = [shelfFilter, statusFilter, search];
    advanceFilters = [
      sort,
      isCompletedFilter,
      hiddenFilter,
      siteFilter,
      languageFilter,
      tagsFilter,
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
      tagsFilter,
      createdAtFilter,
      lastReleasedFilter,
      search,
    ];
  }

  return (
    <Affix className="affix-container">
      <div>
        <div className="manga-filter-basic">
          <Space>{basicFilters}</Space>
          &nbsp;&nbsp;
          <div className="flex-1" />
          <Space>
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
          </Space>
        </div>

        <Collapse bordered={false} activeKey={open ? 1 : undefined}>
          <Panel header={""} key="1" showArrow={false} className="manga-filter-advance">
            <Space wrap>{advanceFilters}</Space>
            {advanceFiltersSecondRows ? <Space wrap>{advanceFiltersSecondRows}</Space> : null}
          </Panel>
        </Collapse>
      </div>
    </Affix>
  );
};

MangaFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};

export default MangaFilters;
