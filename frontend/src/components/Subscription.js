import { useContext, useEffect } from "react";
import { Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";

import { GlobalContext } from "./GlobalContext";
import { askPermissionThenSubscribe, shouldSubscribe } from "../utils/subscription";

const { confirm } = Modal;

const Subscription = () => {
  const [{ user }] = useContext(GlobalContext);

  const onCancel = () => {
    document.cookie = "deniedPushNotification=true; path=/";
  };

  useEffect(() => {
    shouldSubscribe(user).then((result) => {
      if (result) {
        confirm({
          title: "Would you like to receive new release notifications?",
          icon: <BellOutlined />,
          content: (
            <>
              Your mangas will be checked for new chapters twice a day. <br />
              If you choose yes, you will receive a notification if any of your mangas has a new chapter. <br />
              You can always change this setting in Account/Notification.
            </>
          ),
          okText: "Yes, please",
          cancelText: "No thanks",
          onOk: askPermissionThenSubscribe,
          onCancel: onCancel,
        });
      }
    });
  }, [user]);

  return <></>;
};

export default Subscription;
