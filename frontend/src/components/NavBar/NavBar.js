import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Badge, Drawer, Layout, Menu } from "antd";
import { BookOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";

import { FRONTEND_VERSION } from "../../utils/constants";
import { Desktop, Mobile } from "../ScreenSize";
import { AuthAPI } from "../../api";
import { notifyError } from "../../utils/error-handler";
import { GlobalContext } from "../GlobalContext";
import User from "./User";
import LOGO from "./logo.png";

import "./NavBar.less";

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const NavBar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [{ user: hasLoggedIn }] = useContext(GlobalContext);

  const showMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMenu = () => {
    setMobileMenuVisible(false);
  };

  const logout = () => {
    AuthAPI.logout()
      .then(() => {
        window.location = "/";
      })
      .catch(notifyError);
  };

  return (
    <>
      <Desktop
        render={() => (
          <Header className="header">
            <Link to="/" className="logo">
              <img src={LOGO} alt="MangaBookmark" />
              <Badge count={FRONTEND_VERSION} className="version-badge" />
            </Link>
            <Menu mode="horizontal" className="justify-right top-menu">
              <Item key="mangas" icon={<BookOutlined />}>
                <Link to="/mangas">My mangas</Link>
              </Item>
              <SubMenu key="user" title={<User />} icon={hasLoggedIn ? undefined : <LoginOutlined />}>
                <Item key="account" icon={<UserOutlined />}>
                  <Link to="/account">Account</Link>
                </Item>
                <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                  Logout
                </Item>
              </SubMenu>
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
