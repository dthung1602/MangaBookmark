import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Badge, Drawer, Layout, Menu } from "antd";
import {
  BookOutlined,
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  StarOutlined,
  UserOutlined,
  AuditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  FRONTEND_VERSION,
  ROUTE_ACCOUNT,
  ROUTE_ALL_MANGAS,
  ROUTE_HOME,
  ROUTE_LEGAL_NOTICE,
  ROUTE_LOGIN,
  ROUTE_QUICK_ACCESS,
  ROUTE_REGISTER,
} from "../../utils/constants";
import User from "./User";
import NavBarSearch from "./NavBarSearch";
import { Desktop, Mobile } from "../ScreenSize";
import { useLogoutAPI } from "../../hooks";
import { scrollToTop } from "../../utils";
import LOGO from "../../assets/tech-logo/logo-invert.webp";
import "./NavBar.less";

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const NavBar = ({ hideLogo = false }) => {
  const history = useHistory();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [logout, user] = useLogoutAPI();

  useEffect(() => {
    return history.listen((location) => {
      if (!location.hash) {
        setTimeout(scrollToTop, 300);
      }
    });
  }, [history]);

  const showMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMenu = (event) => {
    // when search box is clicked, do not close to allow for user input
    if (event.key !== "search") {
      setMobileMenuVisible(false);
    }
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

  const userIndependentMenu = [
    <Item key="search" icon={<SearchOutlined />}>
      <NavBarSearch onSearch={() => setMobileMenuVisible(false)} />
    </Item>,
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
            {hideLogo ? null : (
              <Link to={ROUTE_HOME} className="navbar-logo">
                <img src={LOGO} alt="MangaBookmark" />
                <Badge count={FRONTEND_VERSION} className="navbar-version-badge" />
              </Link>
            )}
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
              {hideLogo ? null : (
                <Link to="/" className="navbar-logo">
                  <img src={LOGO} alt="MangaBookmark" />
                </Link>
              )}
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

NavBar.propTypes = {
  hideLogo: PropTypes.bool,
};

export default NavBar;
