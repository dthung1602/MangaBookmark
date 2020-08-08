import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

import { ROUTE_LOGIN } from "../utils/constants";
import { GlobalContext } from "./GlobalContext";

function PrivateRoute({ component, ...rest }) {
  const [{ user }] = useContext(GlobalContext);
  const render = ({ location }) => {
    if (user) {
      return React.createElement(component);
    }
    return (
      <Redirect
        to={{
          pathname: ROUTE_LOGIN,
          state: { next: location },
        }}
      />
    );
  };
  return <Route {...rest} render={render} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};

export default PrivateRoute;
