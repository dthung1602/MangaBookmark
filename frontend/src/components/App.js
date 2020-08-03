import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spin } from "antd";

import { GlobalContextProvider } from "./GlobalContext";
import ErrorBoundary from "./ErrorBoundary";

const Account = lazy(() => import("../pages/Account"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Mangas = lazy(() => import("../pages/Mangas"));
const Register = lazy(() => import("../pages/Register"));

const FullScreenLoading = () => (
  <Spin size={"large"}>
    <div style={{ height: "100vh" }} />
  </Spin>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<FullScreenLoading />}>
          <GlobalContextProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/account" component={Account} />
              <Route path="/login" component={Login} />
              <Route path="/mangas" component={Mangas} />
              <Route path="/register" component={Register} />
            </Switch>
          </GlobalContextProvider>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
