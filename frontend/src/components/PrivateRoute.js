import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

import { ROUTE_LOGIN } from "../utils/constants";
import { GlobalContext } from "./GlobalContext";
import FullScreenLoading from "./FullScreenLoading";

function PrivateRoute({ component, ...rest }) {
  const [{ user, isUserLoading }] = useContext(GlobalContext);
  const render = ({ location }) => {
    if (isUserLoading) {
      return <FullScreenLoading />;
    }
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
