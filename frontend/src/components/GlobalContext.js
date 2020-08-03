import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UserAPI } from "../api";
import { checkResponse, notifyError } from "../utils/error-handler";

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalContextProvider = (props) => {
  const [state, setState] = useState({});

  useEffect(() => {
    UserAPI.get()
      .then(async (response) => {
        checkResponse(response);
        const user = await response.json();
        setState({
          ...state,
          user,
        });
      })
      .catch(notifyError);
  }, []);

  return <GlobalContext.Provider value={[state, setState]}>{props.children}</GlobalContext.Provider>;
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalContextProvider };
