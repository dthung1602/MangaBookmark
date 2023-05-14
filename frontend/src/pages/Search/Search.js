import { useCallback, useContext, useState } from "react";

import { StringParam, useQueryParams, withDefault } from "use-query-params";
import { Affix, Input, Space } from "antd";

import MangaListingLayout from "../MangaListingLayout";
import { OmniSearchAPI } from "../../api";
import { Filters } from "../../components";
import { GlobalContext } from "../../components/GlobalContext";
import { ANY } from "../../utils/constants";
import "./Search.less";

const { DropDownFilter } = Filters;

const Search = () => {
  document.title = "Search | MangaBookmark";

  const [{ supportedSearchSites }] = useContext(GlobalContext);

  const [filters, setFilters] = useQueryParams({
    term: StringParam,
    site: withDefault(StringParam, ANY),
  });

  // eslint-disable-next-line no-unused-vars
  const searchScanlationSites = useCallback(() => {
    const sites = filters.site === ANY ? undefined : [filters.site];
    return OmniSearchAPI.searchScanlationSites(filters.term, 10, sites);
  }, [filters]);

  const onSearch = (newTerm) => {
    setFilters({ ...filters, term: newTerm });
  };

  const onChangeSite = (newSite) => {
    setFilters({ ...filters, site: newSite });
  };

  const searchBar = (
    <Affix className="affix-container">
      <Space className="search-bar">
        <DropDownFilter
          displayName="Site"
          options={supportedSearchSites}
          selected={filters.site}
          onSelect={onChangeSite}
        />
        <Input.Search allowClear placeholder="Search" defaultValue={filters.term} onSearch={onSearch} />
      </Space>
    </Affix>
  );

  return (
    <MangaListingLayout
      title="Search scan sites"
      mangasOrFactory={[]}
      loadMode="replace"
      filterNode={searchBar}
      updateMangaFilters={{}}
      updateButtonText=""
    />
  );
};

export default Search;
