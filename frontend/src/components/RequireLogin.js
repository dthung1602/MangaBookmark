import { createElement, useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { ROUTE_LOGIN } from "../utils/constants";
import { GlobalContext } from "./GlobalContext";
import FullScreenLoading from "./FullScreenLoading";

function RequireLogin({ component, location }) {
  const [{ user, isUserLoading }] = useContext(GlobalContext);
  if (isUserLoading) {
    return <FullScreenLoading />;
  }
  if (user) {
    return createElement(component);
  }
  return <Navigate to={ROUTE_LOGIN} state={{ next: location }} />;
}

RequireLogin.propTypes = {
  component: PropTypes.elementType,
  location: PropTypes.string,
};

export default RequireLogin;
