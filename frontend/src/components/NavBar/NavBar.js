import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { throttle } from "lodash";
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
import User from "./User";
import { Desktop, Mobile } from "../ScreenSize";
import { AuthAPI } from "../../api";
import { useOnScreenScrollVertically } from "../../hooks";
import { scrollToTop } from "../../utils";
import { notifyError } from "../../utils/error-handler";
import { GlobalContext } from "../GlobalContext";
import LOGO from "../../assets/logo-invert.png";
import "./NavBar.less";

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const alterPushDownClass = throttle(
  (action) => document.getElementById("root").classList[action]("navbar-hidden"),
  500,
);

const removePushDownClass = () => alterPushDownClass("remove");
const addPushDownClass = () => alterPushDownClass("add");

const NavBar = () => {
  const history = useHistory();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [globalContext, setGlobalContext] = useContext(GlobalContext);
  const { user } = globalContext;

  useOnScreenScrollVertically(removePushDownClass, addPushDownClass);

  useEffect(() => {
    removePushDownClass();
    return history.listen(() => {
      setTimeout(scrollToTop, 500);
    });
  }, []);

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
