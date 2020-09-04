import React, { useEffect, useState } from "react";
import { Button, List, Popconfirm } from "antd";
import {
  AndroidOutlined,
  AppleOutlined,
  DeleteOutlined,
  DesktopOutlined,
  PlusOutlined,
  QuestionOutlined,
  WindowsOutlined,
} from "@ant-design/icons";

import { SubscriptionAPI } from "../../api";
import { checkResponse, notifyError } from "../../utils/error-handler";
import { ADR, IOS, LNX, MAC, UNK, WIN } from "../../utils/constants";
import { askPermissionThenSubscribe } from "../../utils/subscription";
import { truncString } from "../../utils";

const OS_ICON_MAPPING = {
  [WIN]: <WindowsOutlined />,
  [LNX]: <DesktopOutlined />,
  [MAC]: <AppleOutlined />,
  [ADR]: <AndroidOutlined />,
  [IOS]: <AppleOutlined />,
  [UNK]: <QuestionOutlined />,
};

const Notification = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thisBrowserSubscription, setThisBrowserSubscription] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    SubscriptionAPI.get()
      .then(async (response) => {
        checkResponse(response);
        setSubscriptions(await response.json());
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    navigator.serviceWorker.ready.then(async (registration) => {
      const sub = await registration.pushManager.getSubscription();
      setThisBrowserSubscription(sub?.toJSON());
    });
  }, [subscriptions]);

  const unsubscribe = (subId) => () => {
    setIsLoading(true);
    SubscriptionAPI.delete(subId)
      .then(checkResponse)
      .then(async () => {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.getSubscription();
        await sub.unsubscribe();

        setThisBrowserSubscription(null);
        setSubscriptions((prevState) => {
          return prevState.filter((x) => x._id !== subId);
        });
      })
      .catch(notifyError)
      .finally(() => setIsLoading(false));
  };

  const subscribe = async () => {
    const sub = await askPermissionThenSubscribe();
    if (sub) {
      setSubscriptions([...subscriptions, sub]);
    }
  };

  return (
    <List
      dataSource={subscriptions}
      loading={isLoading}
      rowKey="_id"
      footer={
        !thisBrowserSubscription && !isLoading ? (
          <Button type="primary" block={true} icon={<PlusOutlined />} onClick={subscribe}>
            Subscribe this browser
          </Button>
        ) : undefined
      }
      renderItem={(sub) => {
        const title = (
          <>
            {sub.browser} on {sub.os}
            {thisBrowserSubscription?.keys?.auth === sub.auth ? " (this browser)" : null}
          </>
        );
        const description = (
          <>
            Created at: &nbsp;&nbsp;{truncString(sub.createdAt, 10, false)} <br />
            Auth: &nbsp;&nbsp; {truncString(sub.auth, 7, false)}
          </>
        );

        return (
          <List.Item>
            <List.Item.Meta avatar={OS_ICON_MAPPING[sub.os]} title={title} description={description} />
            <Popconfirm title="Unsubscribe this browser?" okType="danger" onConfirm={unsubscribe(sub._id)}>
              <Button type="text" danger={true} icon={<DeleteOutlined />} />
            </Popconfirm>
          </List.Item>
        );
      }}
    />
  );
};

export default Notification;
