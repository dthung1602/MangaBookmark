import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// TODO improve code splitting
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Auth = lazy(() => import("./pages/Auth"));

const App = () => (
  <Router>
    <Suspense fallback={<div style={{ background: "red" }}>Loading...</div>}>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/auth"}>Auth</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
