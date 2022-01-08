import { useRef, useState } from "react";

import PropTypes from "prop-types";
import { Dropdown } from "antd";

import { useSearch } from "./hooks";
import OmniSearchResult from "./OmniSearchResult";
import "./OmniSearch.less";

const OmniSearch = ({ onSearch }) => {
  const [searchResultVisible, setSearchResultVisible] = useState(false);

  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const inputRef = useRef(null);

  const searchContext = useSearch(setSearchResultVisible);

  const handleKeyDown = (event) => {
    const term = inputRef.current.value.trim();
    if (event.key === "Enter" && term) {
      searchContext.search(term);
      onSearch(event);
    }
  };

  const onBlur = () => {
    setPrevSearchTerm(inputRef.current.value.trim());
    inputRef.current.value = "";
    // must delay so that the result doesn't disappear when clicked
    setTimeout(() => setSearchResultVisible(false), 200);
  };

  const onFocus = () => {
    inputRef.current.value = prevSearchTerm;
    if (prevSearchTerm !== "" && searchContext.hasData) {
      setSearchResultVisible(true);
    }
  };

  return (
    <Dropdown
      placement="bottomRight"
      visible={searchResultVisible}
      trigger={[]}
      overlay={<OmniSearchResult searchContext={searchContext} />}
    >
      <input
        className="omnisearch"
        placeholder="Search"
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
      />
    </Dropdown>
  );
};

OmniSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default OmniSearch;
