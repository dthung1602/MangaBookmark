import React from "react";
import { Spin } from "antd";

const FullScreenLoading = () => (
  <Spin size={"large"}>
    <div style={{ height: "100vh" }} />
  </Spin>
);

export default FullScreenLoading;
