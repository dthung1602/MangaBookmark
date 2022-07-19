import { useState } from "react";

import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Dropdown } from "antd";

import { Desktop, Mobile } from "../../components/ScreenSize";
import { useFreezeBackground } from "../../hooks";
import { useSearchAPI } from "./hooks";
import OmniSearchResult from "./OmniSearchResult";
import { buildSearchRoute } from "../../utils/route";
import "./OmniSearch.less";

// FIXME why not work
// const { Desktop, Mobile } = ScreenSize;

const OmniSearch = ({ onSearch }) => {
  const history = useHistory();

  const [searchResultVisible, setSearchResultVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");

  const searchContext = useSearchAPI(setSearchResultVisible, searchTerm);

  useFreezeBackground(searchResultVisible);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDownMobile = (event) => {
    const term = searchTerm.trim();
    if (event.key === "Enter" && term) {
      onSearch(event);
      history.push(buildSearchRoute(term));
    }
  };

  const handleKeyDownDesktop = (event) => {
    const term = searchTerm.trim();
    if (event.key === "Enter" && term) {
      searchContext.search(term);
      onSearch(event);
    }
  };

  const onBlurDesktop = () => {
    // must delay so that the result doesn't disappear when clicked
    setTimeout(() => {
      setPrevSearchTerm(searchTerm.trim());
      setSearchTerm("");
      setSearchResultVisible(false);
    }, 250);
  };

  const onFocusDesktop = () => {
    setSearchTerm(prevSearchTerm);
    if (prevSearchTerm !== "" && searchContext.hasData) {
      setSearchResultVisible(true);
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
              value={searchTerm}
              onBlur={onBlurDesktop}
              onFocus={onFocusDesktop}
              onKeyDown={handleKeyDownDesktop}
              onChange={handleChange}
            />
          </Dropdown>
        )}
      />
      <Mobile
        render={() => (
          <input
            className="omnisearch"
            placeholder="Search"
            value={searchTerm}
            onKeyDown={handleKeyDownMobile}
            onChange={handleChange}
          />
        )}
      />
    </>
  );
};

OmniSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default OmniSearch;
