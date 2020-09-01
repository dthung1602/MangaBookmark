import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { upperFirst } from "lodash";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

import { UserAPI } from "../../api";
import { GlobalContext } from "../GlobalContext";
import { checkResponse, notifyError } from "../../utils/error-handler";
import { ROUTE_LOGIN_FACEBOOK, ROUTE_LOGIN_GOOGLE } from "../../utils/constants";
import "./Button.less";

const useAuthBtnLogic = (type, ssNetwork) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ user }, updateGlobalContext] = useContext(GlobalContext);
  const ssNetworkName = upperFirst(ssNetwork);

  // determine display text
  let text = `Register with ${ssNetworkName}`;
  if (type === "login") {
    text = `Login with ${ssNetworkName}`;
  } else if (type === "unlink") {
    text = `Unlink ${ssNetworkName} account`;
  }

  // disable unlink button when:
  // 1. there's no linked account
  // 2. the linked account is the user only way to login
  const otherSSNetwork = type === "google" ? "facebook" : "google";
  let disabled = false;
  if (type === "unlink") {
    disabled = !user[`${ssNetwork}Id`] || (!user[`${otherSSNetwork}Id`] && !user.password);
  }

  const onClick = () => {
    if (type === "unlink") {
      setIsLoading(true);
      UserAPI.unlink(ssNetwork)
        .then(async (response) => {
          checkResponse(response);
          const newUser = await response.json();
          updateGlobalContext({ user: newUser });
          message.success(`${ssNetworkName} account unlinked`);
        })
        .catch(notifyError)
        .finally(() => setIsLoading(false));
    } else {
      window.location = ssNetwork === "google" ? ROUTE_LOGIN_GOOGLE : ROUTE_LOGIN_FACEBOOK;
    }
  };

  return [isLoading, text, disabled, onClick];
};

export const GoogleButton = ({ type }) => {
  const [isLoading, text, disabled, onClick] = useAuthBtnLogic(type, "google");

  return (
    <Button className="auth-gg-btn" block={true} onClick={onClick} disabled={disabled} loading={isLoading}>
      <GoogleOutlined />
      <span>{text}</span>
    </Button>
  );
};

export const FacebookButton = ({ type }) => {
  const [isLoading, text, disabled, onClick] = useAuthBtnLogic(type, "facebook");

  return (
    <Button className="auth-fb-btn" block={true} onClick={onClick} disabled={disabled} loading={isLoading}>
      <FacebookOutlined />
      <span>{text}</span>
    </Button>
  );
};

GoogleButton.propTypes = FacebookButton.propTypes = {
  type: PropTypes.oneOf(["register", "login", "unlink"]).isRequired,
};
