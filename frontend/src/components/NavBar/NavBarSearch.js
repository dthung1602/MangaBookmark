import React, { useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { ROUTE_ALL_MANGAS } from "../../utils/constants";
import "./NavBarSearch.less";

const NavBarSearch = ({ onSearch }) => {
  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const inputRef = useRef(null);
  const history = useHistory();

  const handleKeyDown = (event) => {
    const search = inputRef.current.value.trim();
    if (event.key === "Enter" && search) {
      const searchParam = new URLSearchParams({ search });
      onSearch();
      history.push(`${ROUTE_ALL_MANGAS}?${searchParam.toString()}`);
    }
  };

  const onBlur = () => {
    setPrevSearchTerm(inputRef.current.value);
    inputRef.current.value = "";
  };

  const onFocus = () => {
    inputRef.current.value = prevSearchTerm;
  };

  return (
    <input
      className="navbar-search"
      placeholder="Search"
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
    />
  );
};
NavBarSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NavBarSearch;
