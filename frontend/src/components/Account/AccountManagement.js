import { useContext, useState } from "react";
import { Avatar, Button, Modal, message } from "antd";

import { GoogleButton, FacebookButton } from "../SocialNetworkButton";
import { GlobalContext } from "../GlobalContext";
import { DeleteOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLogoutAPI } from "../../hooks";
import { UserAPI } from "../../api";
import { notifyError, throwOnCriticalErrors } from "../../utils/error-handler";

const { confirm } = Modal;

const AccountManagement = () => {
  const [{ user }] = useContext(GlobalContext);
  const [isDeletingAccount, setDeletingAccount] = useState(false);

  const [logout] = useLogoutAPI();

  const deleteAccount = () => {
    setDeletingAccount(true);
    UserAPI.delete()
      .result.then((response) => {
        throwOnCriticalErrors(response);
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
    <div>
      {user.googleId ? (
        <>
          You are linked to Google account &nbsp; <Avatar src={user.googlePic} />
          <GoogleButton action="unlink" />
        </>
      ) : (
        <>
          You have not linked to any Google account
          <GoogleButton action="link" />
        </>
      )}
      <br />
      <br />
      {user.facebookId ? (
        <>
          You are linked to Facebook account &nbsp; <Avatar src={user.facebookPic} />
          <FacebookButton action="unlink" />
        </>
      ) : (
        <>
          You have not linked to any Facebook account
          <FacebookButton action="link" />
        </>
      )}
      <br />
      <br />
      Account management
      <br />
      <br />
      <Button key="logout" block icon={<LogoutOutlined />} onClick={logout}>
        Log out
      </Button>
      <br />
      <br />
      <Button loading={isDeletingAccount} block danger={true} icon={<DeleteOutlined />} onClick={confirmDeleteAccount}>
        Delete account
      </Button>
    </div>
  );
};

export default AccountManagement;
