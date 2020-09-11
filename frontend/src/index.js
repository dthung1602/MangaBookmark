import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "antd";

import "./index.less";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

serviceWorker.register({
  onUpdate: () =>
    Modal.info({
      title: "New version available",
      content: (
        <>
          <p>
            A new version of this website is available, which might not be compatible with the current version cached on
            your device.
          </p>
          <p>
            Please close <b>all</b> tabs of this page and then reopen (reloading will not work)
          </p>
        </>
      ),
    }),
});
