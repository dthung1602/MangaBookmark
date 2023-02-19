import { useState } from "react";

import { Link } from "react-router-dom";
import { AuditOutlined, FormOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { useLogoutAPI } from "../../hooks";
import { ROUTE_ACCOUNT, ROUTE_LEGAL_NOTICE, ROUTE_LOGIN, ROUTE_REGISTER } from "../../utils/constants";

const useBuildUserDependentMenu = () => {
  const [logout, user] = useLogoutAPI();
  let userDependentMenu;
  if (user) {
    userDependentMenu = [
      {
        key: "account",
        icon: <UserOutlined />,
        label: <Link to={ROUTE_ACCOUNT}>Account</Link>,
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <span onClick={logout}>Logout</span>,
      },
    ];
  } else {
    userDependentMenu = [
      {
        key: "login",
        icon: <LoginOutlined />,
        label: <Link to={ROUTE_LOGIN}>Login</Link>,
      },
    ];
  }
  userDependentMenu = userDependentMenu.concat([
    {
      key: "register",
      icon: <FormOutlined />,
      label: <Link to={ROUTE_REGISTER}>Register</Link>,
    },
    {
      key: "legal",
      icon: <AuditOutlined />,
      label: <Link to={ROUTE_LEGAL_NOTICE}>Legal notice</Link>,
    },
  ]);
  return userDependentMenu;
};

const useMobileMenuVisibility = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const showMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMenu = (event) => {
    // when search box is clicked, do not close to allow for user input
    if (event.key !== "search") {
      setMobileMenuVisible(false);
    }
  };

  return { mobileMenuVisible, showMenu, closeMenu };
};

export { useBuildUserDependentMenu, useMobileMenuVisibility };
