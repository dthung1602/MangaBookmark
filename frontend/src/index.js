import { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./styles/index.less"; // !important must import index.less before any other style sheet
import App from "./App";
import { addDebugObjectId } from "./utils";
import * as serviceWorkerRegistry from "./utils/service-worker-registry";

if (process.env["NODE_ENV"] !== "PRODUCTION") {
  addDebugObjectId();
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);

serviceWorkerRegistry.register({
  onUpdate: serviceWorkerRegistry.announceNewVersion,
});
