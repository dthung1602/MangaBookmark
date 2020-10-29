import React, { useEffect, useState, useRef } from "react";
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
import { throwOnCriticalErrors, notifyError } from "../../utils/error-handler";
import { ADR, IOS, LNX, MAC, UNKNOWN_OS, WIN } from "../../utils/constants";
import { askPermissionThenSubscribe } from "../../utils/subscription";
import { truncString } from "../../utils";

const OS_ICON_MAPPING = {
  [WIN]: <WindowsOutlined />,
  [LNX]: <DesktopOutlined />,
  [MAC]: <AppleOutlined />,
  [ADR]: <AndroidOutlined />,
  [IOS]: <AppleOutlined />,
  [UNKNOWN_OS]: <QuestionOutlined />,
};

const Notification = () => {
  const subscriptionsLoaded = useRef(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thisBrowserSubscription, setThisBrowserSubscription] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    SubscriptionAPI.get()
      .result.then(async (response) => {
        throwOnCriticalErrors(response);
        setSubscriptions(await response.json());
      })
      .catch(notifyError)
      .finally(() => {
        setIsLoading(false);
        subscriptionsLoaded.current = true;
      });
  }, []);

  useEffect(() => {
    navigator.serviceWorker.ready.then(async (registration) => {
      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        if (subscriptions.find((s) => s.endpoint === sub.endpoint)) {
          setThisBrowserSubscription(sub.toJSON());
        } else if (subscriptionsLoaded.current) {
          // the sub has been deleted from another browser
          await sub.unsubscribe();
        }
      }
    });
  }, [subscriptions]);

  const unsubscribe = (sub) => () => {
    setIsLoading(true);
    SubscriptionAPI.delete(sub._id)
      .result.then(throwOnCriticalErrors)
      .then(async () => {
        // unsubscribe if the user unsubscribed this browser
        const registration = await navigator.serviceWorker.ready;
        const currentSub = await registration.pushManager.getSubscription();
        if (currentSub && sub.endpoint === currentSub.endpoint) {
          await currentSub.unsubscribe();
          setThisBrowserSubscription(null);
        }

        // remove deleted sub
        setSubscriptions((prevState) => {
          return prevState.filter((x) => x._id !== sub._id);
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
            {thisBrowserSubscription?.endpoint === sub.endpoint ? " (this browser)" : null}
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
            <Popconfirm title="Unsubscribe this browser?" okType="danger" onConfirm={unsubscribe(sub)}>
              <Button type="text" danger={true} icon={<DeleteOutlined />} />
            </Popconfirm>
          </List.Item>
        );
      }}
    />
  );
};

export default Notification;
