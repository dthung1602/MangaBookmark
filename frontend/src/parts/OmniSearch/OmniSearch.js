import { useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { Dropdown } from "antd";

import { OmniSearchAPI } from "../../api";
import { doNothing } from "../../utils";
import { ROUTE_ALL_MANGAS } from "../../utils/constants";
import "./OmniSearch.less";
import { throwOnCriticalErrors } from "../../utils/error-handler";
import OmniSearchResult from "./OmniSearchResult";

const OmniSearch = ({ onSearch }) => {
  const [searchResultVisible, setSearchResultVisible] = useState(false);

  const [userMangas, setUserMangas] = useState([]);
  const [isLoadingUserMangas, setIsLoadingUserMangas] = useState(false);

  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const inputRef = useRef(null);
  const history = useHistory();

  const lastFetchAbortFunc = useRef(doNothing);

  const fetchSuggestions = debounce((term) => {
    // console.log(lastFetchAbortFunc.current);
    lastFetchAbortFunc.current();
    setIsLoadingUserMangas(true);
    const userMangaAPICall = OmniSearchAPI.searchUserManga(term);
    userMangaAPICall.result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        const { data } = await response.json();
        setUserMangas(data);
      })
      .catch(() => setIsLoadingUserMangas(false));
    lastFetchAbortFunc.current = userMangaAPICall.abort;
  }, 300);

  const handleKeyDown = (event) => {
    const term = inputRef.current.value.trim();
    if (event.key === "Enter" && term) {
      const searchParam = new URLSearchParams({ term });
      onSearch();
      history.push(`${ROUTE_ALL_MANGAS}?${searchParam.toString()}`);
    }
    fetchSuggestions(term);
  };

  const onBlur = () => {
    setPrevSearchTerm(inputRef.current.value);
    inputRef.current.value = "";
    // setUserMangas([]);
  };

  const onFocus = () => {
    inputRef.current.value = prevSearchTerm;
  };

  return (
    <Dropdown
      placement="bottomRight"
      visible={true}
      trigger={["click"]}
      overlay={<OmniSearchResult userMangas={userMangas} />}
    >
      <input
        className="omni-search"
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
