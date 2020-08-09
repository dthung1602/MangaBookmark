import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spin } from "antd";

import {
  ROUTE_ACCOUNT,
  ROUTE_HOME,
  ROUTE_LEGAL_NOTICE,
  ROUTE_LOGIN,
  ROUTE_MANGAS,
  ROUTE_REGISTER,
  ROUTE_RECENT_MANGAS,
} from "../utils/constants";
import { GlobalContextProvider } from "./GlobalContext";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import FullScreenLoading from "./FullScreenLoading";

const Account = lazy(() => import("../pages/Account"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Mangas = lazy(() => import("../pages/Mangas"));
const RecentlyUpdatedMangas = lazy(() => import("../pages/RecentlyUpdatedMangas"));
const Register = lazy(() => import("../pages/Register"));
const LegalNotice = lazy(() => import("../pages/LegalNotice"));

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<FullScreenLoading />}>
          <GlobalContextProvider>
            <Switch>
              <Route exact path={ROUTE_HOME} component={Home} />
              <Route path={ROUTE_LEGAL_NOTICE} component={LegalNotice} />
              <Route path={ROUTE_LOGIN} component={Login} />
              <Route path={ROUTE_REGISTER} component={Register} />
              <PrivateRoute path={ROUTE_ACCOUNT} component={Account} />
              <PrivateRoute path={ROUTE_MANGAS} component={Mangas} />
              <PrivateRoute path={ROUTE_RECENT_MANGAS} component={RecentlyUpdatedMangas} />
            </Switch>
          </GlobalContextProvider>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
