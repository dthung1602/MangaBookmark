import { Layout, Row, Col } from "antd";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Footer.less";

// TODO reduce image sizes
import LOGO_INVERT from "../../assets/tech-logo/logo-invert.webp";
import TECH_LOGO_SPRITE from "../../assets/tech-logo/tech-logo.webp";
import {
  ROUTE_ACCOUNT,
  ROUTE_HOME,
  ROUTE_LEGAL_NOTICE,
  ROUTE_LOGIN,
  ROUTE_ALL_MANGAS,
  ROUTE_QUICK_ACCESS,
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
  const logos = {
    "img-ant-design-logo": "https://ant.design",
    "img-express-js-logo": "https://expressjs.com/",
    "img-mongodb-logo": "https://www.mongodb.com/",
    "img-looka-logo": "https://looka.com",
    "img-google-app-engine-logo-light": "https://cloud.google.com/appengine",
  };
  return (
    <AntFooter className="footer">
      <Row className="footer-upper">
        <Col xs={24} md={24} lg={8}>
          <img src={LOGO_INVERT} alt="MangaBookmark" />
          <div className="footer-version">Version {FRONTEND_VERSION}</div>
        </Col>
        <Col xs={12} sm={8} lg={6}>
          <div className="footer-row-head">Site map</div>
          <Link to={ROUTE_HOME}>Home</Link>
          <Link to={ROUTE_LEGAL_NOTICE}>Legal notice</Link>
          <Link to={ROUTE_ACCOUNT}>My account</Link>
          <Link to={ROUTE_ALL_MANGAS}>All mangas</Link>
          <Link to={ROUTE_QUICK_ACCESS}>Quick access</Link>
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
            API doc
          </a>
        </Col>
        <Col xs={24} sm={8} lg={4} className="footer-power-by">
          <div className="footer-row-head">Powered by</div>
          {Object.entries(logos).map(([logo, link]) => (
            <div key={logo}>
              <a
                style={{ backgroundImage: `url("${TECH_LOGO_SPRITE}")` }}
                className={logo}
                href={link}
                rel="noopener noreferrer"
                target="_blank"
              />
            </div>
          ))}
        </Col>
      </Row>
      <div className="footer-lower">
        <div className="copyright">Manga Bookmark @{currentYear} dthung</div>
      </div>
    </AntFooter>
  );
};

export default Footer;
