import { useEffect } from "react";

import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Badge, Drawer, Layout, Menu } from "antd";
import { BookOutlined, MenuOutlined, SearchOutlined, StarOutlined } from "@ant-design/icons";

import User from "./User";
import { Desktop, Mobile } from "../../components/ScreenSize";
import OmniSearch from "../OmniSearch";
import { useBuildUserDependentMenu, useMobileMenuVisibility } from "./hooks";
import { scrollToTop } from "../../utils";
import { FRONTEND_VERSION, ROUTE_ALL_MANGAS, ROUTE_HOME, ROUTE_QUICK_ACCESS } from "../../utils/constants";
import LOGO from "../../assets/tech-logo/logo-invert.webp";
import "./NavBar.less";

const { Header } = Layout;
const { Item, SubMenu } = Menu;
// FIXME const { Desktop, Mobile } = ScreenSize; ? why not work

const NavBar = ({ hideLogo = false }) => {
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      if (!location.hash) {
        setTimeout(scrollToTop, 300);
      }
    });
  }, [history]);

  const { mobileMenuVisible, showMenu, closeMenu } = useMobileMenuVisibility();

  const userDependentMenu = useBuildUserDependentMenu();

  const userIndependentMenu = [
    <Item key="search" icon={<SearchOutlined />}>
      <OmniSearch onSearch={closeMenu} />
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
