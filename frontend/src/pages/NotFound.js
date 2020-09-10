import React from "react";
import { Result, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import PageLayout from "./PageLayout";
import { ROUTE_HOME } from "../utils/constants";

const NotFound = () => {
  const history = useHistory();
  const backHome = () => history.push(ROUTE_HOME);

  return (
    <PageLayout>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" icon={<HomeOutlined />} onClick={backHome}>
            Back Home
          </Button>
        }
      />
    </PageLayout>
  );
};

export default NotFound;
