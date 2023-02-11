import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.less"; // !important must import index.less before any other style sheet
import App from "./App";
import { addDebugObjectId } from "./utils";
import * as serviceWorkerRegistry from "./utils/service-worker-registry";

if (process.env["NODE_ENV"] !== "PRODUCTION") {
  addDebugObjectId();
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

serviceWorkerRegistry.register({
  onUpdate: serviceWorkerRegistry.announceNewVersion,
});
