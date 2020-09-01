import React, { useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Button, Card, Grid, Layout, PageHeader, Popconfirm, Tabs, message, Dropdown, Menu, Modal } from "antd";
import { DeleteOutlined, LogoutOutlined, MoreOutlined } from "@ant-design/icons";

import PageLayout from "./PageLayout";
import { Desktop, Mobile } from "../components/ScreenSize";
import { BasicInfo, ChangePassword, LinkedAccount, Notification } from "../components/Account";
import { useLogoutAPI } from "../hooks";
import { checkResponse, notifyError } from "../utils/error-handler";
import backgroundImages from "../assets/background";
import { UserAPI } from "../api";

import "./Account.less";
import { randomFrom } from "../utils";

const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
const { confirm } = Modal;

const TAB_MAPPING = {
  info: {
    displayName: "Basic info",
    component: BasicInfo,
  },
  "change-pass": {
    displayName: "Change password",
    component: ChangePassword,
  },
  "linked-account": {
    displayName: "Linked account",
    component: LinkedAccount,
  },
  notification: {
    displayName: "Notification",
    component: Notification,
  },
};

const Account = () => {
  const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "info"));
  const [isDeletingAccount, setDeletingAccount] = useState(false);

  const [logout] = useLogoutAPI();

  const tabPosition = useBreakpoint().lg ? "left" : "top";
  const bgUrl = randomFrom(backgroundImages);

  const deleteAccount = () => {
    setDeletingAccount(true);
    UserAPI.delete()
      .then((response) => {
        checkResponse(response);
        logout();
        message.success("Account deleted");
      })
      .catch(notifyError)
      .finally(() => setDeletingAccount(false));
  };

  const confirmDeleteAccount = () => {
    confirm({
      title: "Are you sure to delete this account?",
      okType: "danger",
      onOk: deleteAccount,
    });
  };

  return (
    <PageLayout>
      <Layout className="account-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <Desktop>
          <PageHeader
            title="My account"
            ghost={false}
            extra={[
              <Button key="logout" icon={<LogoutOutlined />} onClick={logout}>
                Log out
              </Button>,
              <Popconfirm
                key="delete"
                title="Are you sure to delete this account?"
                placement="bottom"
                onConfirm={deleteAccount}
              >
                <Button loading={isDeletingAccount} danger={true} icon={<DeleteOutlined />}>
                  Delete account
                </Button>
              </Popconfirm>,
            ]}
          />
        </Desktop>
        <Mobile>
          <PageHeader
            title="My account"
            ghost={false}
            extra={
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
                      Logout
                    </Menu.Item>
                    <Menu.Item danger={true} icon={<DeleteOutlined />} onClick={confirmDeleteAccount}>
                      Delete account
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click", "hover"]}
              >
                <Button type="text" shape="circle" icon={<MoreOutlined />} />
              </Dropdown>
            }
          />
        </Mobile>
        <div className="tab-container">
          <Tabs tabPosition={tabPosition} defaultActiveKey={tab} onChange={setTab}>
            {Object.entries(TAB_MAPPING).map(([key, { displayName, component }]) => {
              const content = React.createElement(component);
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
      </Layout>
    </PageLayout>
  );
};

export default Account;
