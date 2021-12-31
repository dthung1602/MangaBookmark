import { createElement } from "react";

import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Grid } from "antd";

import { Account as AccountComponents } from "../../components";
import BoxLayout from "../BoxLayout";
import "./Account.less";

const { useBreakpoint } = Grid;
const { BasicInfo, ChangePassword, AccountManagement, Notification } = AccountComponents;

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
  const { displayName, component } = TAB_MAPPING[tab];
  const content = createElement(component);

  return (
    <BoxLayout showFooter={false} title={displayName}>
      {content}
    </BoxLayout>
  );
};

export default Account;
