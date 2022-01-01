import { createElement } from "react";

import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Grid, Tabs } from "antd";
import { ToolOutlined, UserOutlined, KeyOutlined, NotificationOutlined } from "@ant-design/icons";

import { VerticalButtonGroup } from "../../components";
import { AccountSettings } from "../../parts";
import BoxLayout from "../BoxLayout";
import "./Account.less";

const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const { User, Password, General, Notification } = AccountSettings;
const { Button } = VerticalButtonGroup;

const TAB_MAPPING = {
  general: {
    displayName: "General",
    component: General,
    icon: <ToolOutlined />,
  },
  user: {
    displayName: "User",
    component: User,
    icon: <UserOutlined />,
  },
  password: {
    displayName: "Password",
    component: Password,
    icon: <KeyOutlined />,
  },
  notification: {
    displayName: "Notification",
    component: Notification,
    icon: <NotificationOutlined />,
  },
};

const Account = () => {
  const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "general"));
  const useVerticalButtons = useBreakpoint().sm;
  const { displayName, component } = TAB_MAPPING[tab] || "general";
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
