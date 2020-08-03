import React from "react";
import { Layout, Row, Col } from "antd";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Footer.less";

// TODO reduce image sizes
import LOGO_INVERT from "../../assets/logo-invert.png";
import ANT_DESIGN_LOGO from "../../assets/ant-design-logo.png";
import EXPRESS_JS_LOGO from "../../assets/express-js-logo.png";
import LOOKA_LOGO from "../../assets/looka-logo.png";
import MONGO_DB_LOGO from "../../assets/mongodb-logo.png";
import HEROKU_LOGO from "../../assets/heroku-logo.png";
import {
  ROUTE_ACCOUNT,
  ROUTE_HOME,
  ROUTE_LEGAL_NOTICE,
  ROUTE_LOGIN,
  ROUTE_MANGAS,
  ROUTE_RECENT_MANGAS,
  ROUTE_REGISTER,
  ROUTE_API_DOC,
  LINK_EMAIL,
  LINK_GITHUB,
  LINK_ISSUE_TRACKER,
  LINK_LINKEDIN,
} from "../../utils/constants";
import { FRONTEND_VERSION } from "../../utils/constants";
const { Footer: AntFooter } = Layout;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <AntFooter className="footer">
      <Row className="upper-footer">
        <Col xs={24} md={24} lg={8}>
          <img src={LOGO_INVERT} alt="MangaBookmark" />
          <div className="footer-version">Version {FRONTEND_VERSION}</div>
        </Col>
        <Col xs={12} sm={8} lg={6}>
          <div className="footer-row-head">Site map</div>
          <Link to={ROUTE_HOME}>Home</Link>
          <Link to={ROUTE_LEGAL_NOTICE}>Legal notice</Link>
          <Link to={ROUTE_ACCOUNT}>My account</Link>
          <Link to={ROUTE_MANGAS}>All mangas</Link>
          <Link to={ROUTE_RECENT_MANGAS}>Recently updated</Link>
          <Link to={ROUTE_LOGIN}>Login</Link>
          <Link to={ROUTE_REGISTER}>Register</Link>
        </Col>
        <Col xs={12} sm={8} lg={6}>
          <div className="footer-row-head">Contact</div>
          <a href={LINK_EMAIL} rel="noopener noreferrer" target="_blank">
            <MailOutlined className="footer-icon" /> Email
          </a>
          <a href={LINK_GITHUB} rel="noopener noreferrer" target="_blank">
            <GithubOutlined className="footer-icon" /> Github
          </a>
          <a href={LINK_LINKEDIN} rel="noopener noreferrer" target="_blank">
            <LinkedinOutlined className="footer-icon" /> Linkedin
          </a>
          <div className="footer-row-head">Other links</div>
          <a href={LINK_ISSUE_TRACKER} rel="noopener noreferrer" target="_blank">
            Issue tracker
          </a>
          <a href={ROUTE_API_DOC} rel="noopener noreferrer" target="_blank">
            API documentation
          </a>
        </Col>
        <Col xs={24} sm={8} lg={4} className="power-by">
          <div className="footer-row-head">Powered by</div>
          <a href="https://ant.design" rel="noopener noreferrer" target="_blank">
            <img src={ANT_DESIGN_LOGO} alt="ant design" />
          </a>
          <a href="https://expressjs.com/" rel="noopener noreferrer" target="_blank">
            <img src={EXPRESS_JS_LOGO} alt="express js" />
          </a>
          <a href="https://www.mongodb.com/" rel="noopener noreferrer" target="_blank">
            <img src={MONGO_DB_LOGO} alt="" />
          </a>
          <a href="https://looka.com" rel="noopener noreferrer" target="_blank">
            <img src={LOOKA_LOGO} alt="looka" />
          </a>
          <a href="https://www.heroku.com/" rel="noopener noreferrer" target="_blank">
            <img src={HEROKU_LOGO} alt="heroku" />
          </a>
        </Col>
      </Row>
      <div className="lower-footer">
        <div className="copyright">Manga Bookmark @{currentYear} dthung1602</div>
      </div>
    </AntFooter>
  );
};

export default Footer;
