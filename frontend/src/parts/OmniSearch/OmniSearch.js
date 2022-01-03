import { useRef, useState } from "react";

import PropTypes from "prop-types";
import { debounce } from "lodash";
import { Dropdown } from "antd";

import { OmniSearchAPI } from "../../api";
import { doNothing } from "../../utils";
import { notifyError, throwOnCriticalErrors } from "../../utils/error-handler";
import OmniSearchResult from "./OmniSearchResult";
import "./OmniSearch.less";

const OmniSearch = ({ onSearch }) => {
  const [searchResultVisible, setSearchResultVisible] = useState(false);

  const [userMangas, setUserMangas] = useState([]);
  const [isLoadingUserMangas, setIsLoadingUserMangas] = useState(false);

  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const inputRef = useRef(null);

  const lastFetchAbortFunc = useRef(doNothing);

  const fetchSuggestions = debounce((term) => {
    // console.log(lastFetchAbortFunc.current);
    lastFetchAbortFunc.current();
    setSearchResultVisible(true);
    setIsLoadingUserMangas(true);
    setUserMangas([]);
    const userMangaAPICall = OmniSearchAPI.searchUserManga(term);
    userMangaAPICall.result
      .then(async (response) => {
        throwOnCriticalErrors(response);
        const { data } = await response.json();
        setUserMangas(data);
      })
      .catch(notifyError)
      .finally(() => setIsLoadingUserMangas(false));
    lastFetchAbortFunc.current = userMangaAPICall.abort;
  }, 300);

  const handleKeyDown = (event) => {
    const term = inputRef.current.value.trim();
    if (event.key === "Enter" && term) {
      fetchSuggestions(term);
      onSearch();
    }
  };

  const onBlur = () => {
    setPrevSearchTerm(inputRef.current.value.trim());
    inputRef.current.value = "";
    setTimeout(() => setSearchResultVisible(false), 200);
  };

  const onFocus = () => {
    inputRef.current.value = prevSearchTerm;
    if (prevSearchTerm !== "" && userMangas.length > 0) {
      console.log({ prevSearchTerm, userMangas, x: prevSearchTerm && userMangas });
      setSearchResultVisible(true);
    }
  };

  return (
    <Dropdown
      placement="bottomRight"
      visible={searchResultVisible}
      trigger={[]}
      overlay={<OmniSearchResult userMangas={userMangas} isLoadingUserMangas={isLoadingUserMangas} />}
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
