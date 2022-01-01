import { createElement } from "react";

import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Grid, Tabs } from "antd";
import { ToolOutlined, UserOutlined, KeyOutlined, NotificationOutlined } from "@ant-design/icons";

import { Account as AccountComponents, VerticalButtonGroup } from "../../components";
import BoxLayout from "../BoxLayout";
import "./Account.less";

const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const { BasicInfo, ChangePassword, AccountManagement, Notification } = AccountComponents;
const { Button } = VerticalButtonGroup;

const TAB_MAPPING = {
  "account-management": {
    displayName: "Account management",
    component: AccountManagement,
    icon: <ToolOutlined />,
  },
  info: {
    displayName: "Basic info",
    component: BasicInfo,
    icon: <UserOutlined />,
  },
  "change-pass": {
    displayName: "Change password",
    component: ChangePassword,
    icon: <KeyOutlined />,
  },
  notification: {
    displayName: "Notification",
    component: Notification,
    icon: <NotificationOutlined />,
  },
};

const Account = () => {
  const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "account-management"));
  const useVerticalButtons = useBreakpoint().sm;
  const { displayName, component } = TAB_MAPPING[tab];
  const content = createElement(component);

  const tabController = useVerticalButtons ? (
    <div className="account-tab-buttons-container">
      <VerticalButtonGroup side="left" solidColor={false} expandOnHover={true}>
        {Object.entries(TAB_MAPPING).map(([key, { displayName, icon }]) => (
          <Button key={key} type="primary" icon={icon} selected={key === tab} onClick={() => setTab(key)}>
            {displayName}
          </Button>
        ))}
      </VerticalButtonGroup>
    </div>
  ) : (
    <Tabs activeKey={tab} onChange={setTab}>
      {Object.entries(TAB_MAPPING).map(([key, { displayName, icon }]) => (
        <TabPane
          key={key}
          tab={
            <>
              &nbsp;&nbsp;&nbsp;{icon}
              {displayName}&nbsp;&nbsp;&nbsp;
            </>
          }
        />
      ))}
    </Tabs>
  );

  return (
    <BoxLayout showFooter={false} title={displayName} extraContent={tabController} containerClass="account">
      {content}
    </BoxLayout>
  );
};

export default Account;
