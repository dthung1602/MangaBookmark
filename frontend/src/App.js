import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spin } from "antd";

import ErrorBoundary from "./components/ErrorBoundary";

const Account = lazy(() => import("./pages/Account"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Mangas = lazy(() => import("./pages/Mangas"));
const Register = lazy(() => import("./pages/Register"));

const FullScreenLoading = () => (
  <Spin size={"large"}>
    <div style={{ height: "100vh" }} />
  </Spin>
);

const App = () => (
  <ErrorBoundary>
    <Router>
      <Suspense fallback={<FullScreenLoading />}>
        {/*<div>*/}
        {/*  <Link to={"/"}>Home</Link>*/}
        {/*  <Link to={"/account"}>Account</Link>*/}
        {/*  <Link to={"/login"}>Login</Link>*/}
        {/*  <Link to={"/mangas"}>PageLayout</Link>*/}
        {/*  <Link to={"/register"}>Register</Link>*/}
        {/*</div>*/}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/login" component={Login} />
          <Route path="/mangas" component={Mangas} />
          <Route path="/register" component={Register} />
        </Switch>
      </Suspense>
    </Router>
  </ErrorBoundary>
);

export default App;
