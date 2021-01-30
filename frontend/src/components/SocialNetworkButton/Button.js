import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

import { UserAPI } from "../../api";
import { GlobalContext } from "../GlobalContext";
import { throwOnCriticalErrors, notifyError } from "../../utils/error-handler";
import { ROUTE_LOGIN_FACEBOOK, ROUTE_LOGIN_GOOGLE } from "../../utils/constants";
import "./Button.less";

const useAuthBtnLogic = (action, ssNetwork) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ user }, updateGlobalContext] = useContext(GlobalContext);
  const ssNetworkName = ssNetwork[0].toUpperCase() + ssNetwork.slice(1);

  // determine display text
  let text = `Register with ${ssNetworkName}`;
  if (action === "login") {
    text = `Login with ${ssNetworkName}`;
  } else if (action === "unlink") {
    text = `Unlink ${ssNetworkName} account`;
  } else if (action === "link") {
    text = `Link to ${ssNetworkName} account`;
  }

  // disable unlink button when either:
  // 1. there's no linked account
  // 2. the linked account is the user only way to login
  const otherSSNetwork = ssNetwork === "google" ? "facebook" : "google";
  let disabled = false;
  if (action === "unlink") {
    disabled = !user[`${ssNetwork}Id`] || (!user[`${otherSSNetwork}Id`] && !user.password);
  }

  const onClick = () => {
    if (action === "unlink") {
      setIsLoading(true);
      UserAPI.unlink(ssNetwork)
        .result.then(async (response) => {
          throwOnCriticalErrors(response);
          const newUser = await response.json();
          updateGlobalContext({ user: newUser });
          message.success(`${ssNetworkName} account unlinked`);
        })
        .catch(notifyError)
        .finally(() => setIsLoading(false));
    } else {
      const path = ssNetwork === "google" ? ROUTE_LOGIN_GOOGLE : ROUTE_LOGIN_FACEBOOK;
      window.location = `${path}?action=${action}`;
    }
  };

  return [isLoading, text, disabled, onClick];
};

export const GoogleButton = ({ action }) => {
  const [isLoading, text, disabled, onClick] = useAuthBtnLogic(action, "google");

  return (
    <Button className="auth-gg-btn" block={true} onClick={onClick} disabled={disabled} loading={isLoading}>
      <GoogleOutlined />
      <span>{text}</span>
    </Button>
  );
};

export const FacebookButton = ({ action }) => {
  const [isLoading, text, disabled, onClick] = useAuthBtnLogic(action, "facebook");

  return (
    <Button className="auth-fb-btn" block={true} onClick={onClick} disabled={disabled} loading={isLoading}>
      <FacebookOutlined />
      <span>{text}</span>
    </Button>
  );
};

GoogleButton.propTypes = FacebookButton.propTypes = {
  action: PropTypes.oneOf(["register", "login", "unlink", "link"]).isRequired,
};
