import { useState } from "react";

import { Link } from "react-router-dom";
import { Menu } from "antd";
import { AuditOutlined, FormOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { useLogoutAPI } from "../../hooks";
import { ROUTE_ACCOUNT, ROUTE_LEGAL_NOTICE, ROUTE_LOGIN, ROUTE_REGISTER } from "../../utils/constants";

const { Item } = Menu;

const useBuildUserDependentMenu = () => {
  const [logout, user] = useLogoutAPI();
  let userDependentMenu;
  if (user) {
    userDependentMenu = [
      <Item key="account" icon={<UserOutlined />}>
        <Link to={ROUTE_ACCOUNT}>Account</Link>
      </Item>,
      <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Item>,
    ];
  } else {
    userDependentMenu = [
      <Item key="login" icon={<LoginOutlined />}>
        <Link to={ROUTE_LOGIN}>Login</Link>
      </Item>,
    ];
  }
  userDependentMenu = userDependentMenu.concat([
    <Item key="register" icon={<FormOutlined />}>
      <Link to={ROUTE_REGISTER}>Register</Link>
    </Item>,
    <Item key="legal" icon={<AuditOutlined />}>
      <Link to={ROUTE_LEGAL_NOTICE}>Legal notice</Link>
    </Item>,
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
