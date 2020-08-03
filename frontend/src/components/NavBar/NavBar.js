import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Badge, Drawer, Layout, Menu } from "antd";
import {
  BookOutlined,
  HistoryOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  FRONTEND_VERSION,
  ROUTE_LOGIN,
  ROUTE_RECENT_MANGAS,
  ROUTE_ACCOUNT,
  ROUTE_MANGAS,
  ROUTE_HOME,
} from "../../utils/constants";
import { Desktop, Mobile } from "../ScreenSize";
import { AuthAPI } from "../../api";
import { notifyError } from "../../utils/error-handler";
import { GlobalContext } from "../GlobalContext";
import User from "./User";
import LOGO from "../../assets/logo-invert.png";

import "./NavBar.less";

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const NavBar = () => {
  const history = useHistory();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [globalContext, setGlobalContext] = useContext(GlobalContext);
  const { user } = globalContext;

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

  let userButton;
  if (user) {
    userButton = (
      <SubMenu key="user" title={<User />}>
        <Item key="account" icon={<UserOutlined />}>
          <Link to={ROUTE_ACCOUNT}>Account</Link>
        </Item>
        <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>
    );
  } else {
    userButton = (
      <Item key="login" icon={<LoginOutlined />}>
        <Link to={ROUTE_LOGIN}>Login</Link>
      </Item>
    );
  }

  return (
    <>
      <Desktop
        render={() => (
          <Header className="header">
            <Link to={ROUTE_HOME} className="logo">
              <img src={LOGO} alt="MangaBookmark" />
              <Badge count={FRONTEND_VERSION} className="version-badge" />
            </Link>
            <Menu mode="horizontal" className="justify-right top-menu">
              <Item key="mangas" icon={<BookOutlined />}>
                <Link to={ROUTE_MANGAS}>All mangas</Link>
              </Item>
              <Item key="recent" icon={<HistoryOutlined />}>
                <Link to={ROUTE_RECENT_MANGAS}>Recently updated</Link>
              </Item>
              {userButton}
            </Menu>
          </Header>
        )}
      />

      <Mobile
        render={() => (
          <>
            <Header className="header">
              <div className="top-menu-btn-mobile" onClick={showMenu}>
                <MenuOutlined />
              </div>
              <Link to="/" className="logo">
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
                <Item key="mangas" icon={<BookOutlined />}>
                  <Link to="/mangas">My mangas</Link>
                </Item>
                <Item key="account" icon={<UserOutlined />}>
                  <Link to="/account">Account</Link>
                </Item>
                <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                  Logout
                </Item>
              </Menu>
            </Drawer>
          </>
        )}
      />

      <div className={"header-push"} />
    </>
  );
};

export default NavBar;
