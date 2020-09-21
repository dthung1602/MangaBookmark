import React from "react";
import ReactDOM from "react-dom";
import { ReloadOutlined } from "@ant-design/icons";
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
  onUpdate: (registration) => {
    const { waiting } = registration;
    if (waiting) {
      Modal.confirm({
        title: "New version available",
        content: (
          <>
            <p>
              A new version of this website is available, which might not be compatible with the current version cached
              on your device.
            </p>
            <p>
              Please close <b>all</b> other tabs of this page and then reload.
            </p>
          </>
        ),
        okText: (
          <span>
            <ReloadOutlined /> &nbsp; Reload
          </span>
        ),
        onOk: () => {
          waiting.postMessage({ type: "SKIP_WAITING" });
          window.location.reload();
          return false;
        },
        cancelText: "Cancel",
      });
    }
  },
});
