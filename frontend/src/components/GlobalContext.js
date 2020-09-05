import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UserAPI, MangaAPI } from "../api";
import { checkResponse, notifyError } from "../utils/error-handler";

const initContext = {
  user: null,
  isUserLoading: true,
  supportedSites: [],
};

const GlobalContext = React.createContext([initContext, (s) => s]);

const GlobalContextProvider = (props) => {
  const [state, setState] = useState(initContext);

  const updateState = (newState) => {
    setState({
      ...state,
      ...newState,
    });
  };

  // fetch all global data here
  useEffect(() => {
    UserAPI.get()
      .then(async (response) => {
        checkResponse(response);
        const user = await response.json();
        setState((prevState) => {
          return {
            ...prevState,
            user,
            isUserLoading: false,
          };
        });
      })
      .catch(notifyError);

    MangaAPI.getSupportedSites()
      .then(async (response) => {
        checkResponse(response);
        const supportedSites = await response.json();
        setState((prevState) => {
          return {
            ...prevState,
            supportedSites,
          };
        });
      })
      .catch(notifyError);
  }, []);

  return <GlobalContext.Provider value={[state, updateState]}>{props.children}</GlobalContext.Provider>;
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalContextProvider };
