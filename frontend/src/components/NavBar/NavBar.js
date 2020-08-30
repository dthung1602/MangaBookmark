import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Badge, Drawer, Layout, Menu } from "antd";
import {
  BookOutlined,
  StarOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";

import {
  FRONTEND_VERSION,
  ROUTE_LOGIN,
  ROUTE_QUICK_ACCESS,
  ROUTE_ACCOUNT,
  ROUTE_ALL_MANGAS,
  ROUTE_HOME,
  ROUTE_REGISTER,
} from "../../utils/constants";
import { Desktop, Mobile } from "../ScreenSize";
import { AuthAPI } from "../../api";
import { notifyError } from "../../utils/error-handler";
import { GlobalContext } from "../GlobalContext";
import User from "./User";
import { useOnScreenScrollVertically } from "../../hooks";
import LOGO from "../../assets/logo-invert.png";
import "./NavBar.less";

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const NavBar = () => {
  const history = useHistory();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [globalContext, setGlobalContext] = useContext(GlobalContext);
  const { user } = globalContext;

  useOnScreenScrollVertically(
    () => document.querySelectorAll("#root").forEach((e) => e.classList.remove("navbar-hidden")),
    () => document.querySelectorAll("#root").forEach((e) => e.classList.add("navbar-hidden")),
  );

  const showMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMenu = () => {
    setMobileMenuVisible(false);
  };

  const logout = () => {
    AuthAPI.logout()
      .then(() => {
        setGlobalContext({
          ...globalContext,
          user: null,
        });
        history.push("/");
      })
      .catch(notifyError);
  };

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
      <Item key="register" icon={<FormOutlined />}>
        <Link to={ROUTE_REGISTER}>Register</Link>
      </Item>,
    ];
  }

  const userIndependentMenu = [
    <Item key="quick" icon={<StarOutlined />}>
      <Link to={ROUTE_QUICK_ACCESS}>Quick access</Link>
    </Item>,
    <Item key="mangas" icon={<BookOutlined />}>
      <Link to={ROUTE_ALL_MANGAS}>All mangas</Link>
    </Item>,
  ];

  return (
    <>
      <Desktop
        render={() => (
          <Header className="header">
            <Link to={ROUTE_HOME} className="navbar-logo">
              <img src={LOGO} alt="MangaBookmark" />
              <Badge count={FRONTEND_VERSION} className="navbar-version-badge" />
            </Link>
            <Menu mode="horizontal" className="justify-right navbar-menu">
              {userIndependentMenu}
              <SubMenu key="user" title={<User />}>
                {userDependentMenu}
              </SubMenu>
            </Menu>
          </Header>
        )}
      />

      <Mobile
        render={() => (
          <>
            <Header className="header">
              <div className="navbar-mobile-menu-btn" onClick={showMenu}>
                <MenuOutlined />
              </div>
              <Link to="/" className="navbar-logo">
                <img src={LOGO} alt="MangaBookmark" />
              </Link>
            </Header>

            <Drawer
              title="Menu"
              placement="left"
              width={""}
              closable={true}
              onClose={closeMenu}
              visible={mobileMenuVisible}
            >
              <Menu mode="inline" onClick={closeMenu}>
                {userIndependentMenu}
                {userDependentMenu}
              </Menu>
            </Drawer>
          </>
        )}
      />

      <div className="header-push" />
    </>
  );
};

export default NavBar;
