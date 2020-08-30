import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import {
  ROUTE_ACCOUNT,
  ROUTE_HOME,
  ROUTE_LEGAL_NOTICE,
  ROUTE_LOGIN,
  ROUTE_ALL_MANGAS,
  ROUTE_QUICK_ACCESS,
  ROUTE_REGISTER,
} from "../utils/constants";
import { GlobalContextProvider } from "./GlobalContext";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import FullScreenLoading from "./FullScreenLoading";

const Account = lazy(() => import("../pages/Account"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const AllMangas = lazy(() => import("../pages/AllMangas"));
const QuickAccess = lazy(() => import("../pages/QuickAccess"));
const Register = lazy(() => import("../pages/Register"));
const LegalNotice = lazy(() => import("../pages/LegalNotice"));

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Suspense fallback={<FullScreenLoading />}>
            <GlobalContextProvider>
              <Switch>
                <Route exact path={ROUTE_HOME} component={Home} />
                <Route path={ROUTE_LEGAL_NOTICE} component={LegalNotice} />
                <Route path={ROUTE_LOGIN} component={Login} />
                <Route path={ROUTE_REGISTER} component={Register} />
                <PrivateRoute path={ROUTE_ACCOUNT} component={Account} />
                <PrivateRoute path={ROUTE_ALL_MANGAS} component={AllMangas} />
                <PrivateRoute path={ROUTE_QUICK_ACCESS} component={QuickAccess} />
              </Switch>
            </GlobalContextProvider>
          </Suspense>
        </QueryParamProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
