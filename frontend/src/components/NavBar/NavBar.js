import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout, Avatar, Badge, Drawer } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined, BookOutlined } from "@ant-design/icons";
import LOGO from "./logo.png";
import "./NavBar.less";

import { FRONTEND_VERSION } from "../../utils/constants";
import { Desktop, Mobile } from "../ScreenSize";

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const NavBar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const showMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMenu = () => {
    setMobileMenuVisible(false);
  };

  const logout = () => {
    // TODO logout
    console.log("LOGOUT");
  };

  const user = (
    <div>
      <Avatar icon={<UserOutlined />} />
      &nbsp; &nbsp; My username
    </div>
  );

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
              <Item key="mangas">
                <Link to="/mangas">My mangas</Link>
              </Item>
              <SubMenu key="user" title={user}>
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
