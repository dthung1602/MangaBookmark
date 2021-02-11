import { createElement } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Card, Grid, Layout, Tabs } from "antd";

import PageLayout from "./PageLayout";
import { BasicInfo, ChangePassword, AccountManagement, Notification } from "../components/Account";
import backgroundImages from "../assets/background";

import "./Account.less";
import { randomFrom } from "../utils";
import CornerImageSource from "../components/CornerImageSource";

const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

const TAB_MAPPING = {
  "account-management": {
    displayName: "Account management",
    component: AccountManagement,
  },
  info: {
    displayName: "Basic info",
    component: BasicInfo,
  },
  "change-pass": {
    displayName: "Change password",
    component: ChangePassword,
  },
  notification: {
    displayName: "Notification",
    component: Notification,
  },
};

const Account = () => {
  const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "account-management"));

  const tabPosition = useBreakpoint().lg ? "left" : "top";
  const bgUrl = randomFrom(backgroundImages);

  return (
    <PageLayout>
      <Layout className="account-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <div className="tab-container">
          <Tabs tabPosition={tabPosition} defaultActiveKey={tab} onChange={setTab}>
            {Object.entries(TAB_MAPPING).map(([key, { displayName, component }]) => {
              const content = createElement(component);
              return (
                <TabPane key={key} tab={displayName}>
                  <Card title={displayName} className="card-form">
                    {content}
                  </Card>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
        <CornerImageSource url="https://wall.alphacoders.com" name="Wallpaper Abyss" />
      </Layout>
    </PageLayout>
  );
};

export default Account;
