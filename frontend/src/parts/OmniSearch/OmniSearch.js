import { useRef, useState } from "react";

import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Dropdown } from "antd";

import { Desktop, Mobile } from "../../components/ScreenSize";
import { useSearch } from "./hooks";
import OmniSearchResult from "./OmniSearchResult";
import { buildSearchRoute } from "../../utils/route";
import "./OmniSearch.less";

// FIXME why not work
// const { Desktop, Mobile } = ScreenSize;

const OmniSearch = ({ onSearch }) => {
  const history = useHistory();

  const [searchResultVisible, setSearchResultVisible] = useState(false);

  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const inputRef = useRef(null);

  const searchContext = useSearch(setSearchResultVisible);

  const handleKeyDownDesktop = (event) => {
    const term = inputRef.current.value.trim();
    if (event.key === "Enter" && term) {
      searchContext.search(term);
      onSearch(event);
    }
  };

  const onBlurDesktop = () => {
    setPrevSearchTerm(inputRef.current.value.trim());
    inputRef.current.value = "";
    // must delay so that the result doesn't disappear when clicked
    setTimeout(() => setSearchResultVisible(false), 200);
  };

  const onFocusDesktop = () => {
    inputRef.current.value = prevSearchTerm;
    if (prevSearchTerm !== "" && searchContext.hasData) {
      setSearchResultVisible(true);
    }
  };

  const handleKeyDownMobile = (event) => {
    const term = inputRef.current.value.trim();
    if (event.key === "Enter" && term) {
      onSearch(event);
      history.push(buildSearchRoute(term));
    }
  };

  return (
    <>
      <Desktop
        render={() => (
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
              onBlur={onBlurDesktop}
              onFocus={onFocusDesktop}
              onKeyDown={handleKeyDownDesktop}
            />
          </Dropdown>
        )}
      />
      <Mobile
        render={() => (
          <input className="omnisearch" placeholder="Search" ref={inputRef} onKeyDown={handleKeyDownMobile} />
        )}
      />
    </>
  );
};

OmniSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default OmniSearch;
