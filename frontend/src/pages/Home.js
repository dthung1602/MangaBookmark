import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Typography, Button, Row, Col, Divider } from "antd";
import {
  ThunderboltFilled,
  GlobalOutlined,
  NotificationOutlined,
  DoubleRightOutlined,
  FormOutlined,
  GithubOutlined,
  BugOutlined,
  ArrowUpOutlined,
  DatabaseOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { scrollToTop } from "../utils";
import { GlobalContext } from "../components/GlobalContext";
import {
  ROUTE_REGISTER,
  LINK_GITHUB,
  ROUTE_API_DOC,
  ROUTE_LEGAL_NOTICE,
  LINK_EMAIL,
  LINK_LINKEDIN,
  EMBED_QUICK_TOUR_VIDEO_ID,
  FRONTEND_VERSION,
} from "../utils/constants";
import LOGO from "../assets/logo/logo-invert.webp";
import ANT_DESIGN_LOGO from "../assets/logo/ant-design-logo-light.webp";
import EXPRESS_JS_LOGO from "../assets/logo/express-js-logo-light.webp";
import MONGO_DB_LOGO from "../assets/logo/mongodb-logo.webp";
import LOOKA_LOGO from "../assets/logo/looka-logo.webp";
import HEROKU_LOGO from "../assets/logo/heroku-logo.webp";
import "./Home.less";

const { Title } = Typography;

const Home = () => {
  const [{ supportedSites }] = useContext(GlobalContext);
  const [clickedYoutube, setClickedYoutube] = useState(false);

  return (
    <Layout>
      <NavBar hideLogo={true} />

      <Layout>
        <div className="home">
          <div className="logo-container">
            <div className="logo">
              <img src={LOGO} alt="MangaBookmark" />
              <span className="version">Version {FRONTEND_VERSION}</span>
            </div>
            <span className="subtitle">Keep tracks of your mangas on scanlation sites</span> &nbsp;&nbsp;
            <Link to={ROUTE_REGISTER}>
              <Button type="primary" size="medium" icon={<FormOutlined />}>
                Create free account
              </Button>
            </Link>
          </div>

          <div className="card-container">
            <div className="card">
              <div className="cover">
                <ThunderboltFilled />
              </div>
              <div className="title">
                <h2>Quick access</h2>
              </div>
              <p>
                This site will help you keep track, organize and have quick access to the mangas in your collection. No
                more forgetting or browser bookmarks or Excel files!
              </p>
              <Button block type="text" href="#quick-tour">
                Take a quick tour &nbsp;&nbsp; <DoubleRightOutlined />
              </Button>
            </div>
            <div className="card">
              <div className="cover">
                <GlobalOutlined />
              </div>
              <h2>{supportedSites.length} sites supported</h2>
              <p>
                One site is never enough! Some mangas appear exclusively on particular sites and it can takes months for
                another site to leach the mangas.
              </p>
              <p>
                We are currently supporting {supportedSites.length} scanlation sites and planning to add even more in
                the future.
              </p>
              <Button block type="text" href="#supported-sites">
                Full list of supported sites &nbsp;&nbsp; <DoubleRightOutlined />
              </Button>
            </div>
            <div className="card">
              <div className="cover">
                <NotificationOutlined />
              </div>
              <h2>Notification</h2>
              <p>
                When you favorite mangas release a new chapter, you will get notified via browser notification! Hooray!
              </p>
            </div>
          </div>

          <div className="text-align-center" id="quick-tour">
            <Title level={2}>Quick tour</Title>
            {clickedYoutube ? (
              <iframe
                className="iframe"
                title="quick-tour-video"
                src={`https://www.youtube.com/embed/${EMBED_QUICK_TOUR_VIDEO_ID}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                className="iframe"
                onClick={() => setClickedYoutube(true)}
                alt="video"
                src={`https://i.ytimg.com/vi/${EMBED_QUICK_TOUR_VIDEO_ID}/sddefault.jpg`}
              />
            )}
          </div>

          <div className="text-align-center" id="supported-sites">
            <Title level={2}>Supported sites</Title>
            <Row gutter={{ xs: 16, sm: 24, md: 32 }}>
              {supportedSites.map((site) => (
                <Col key={site.name} xs={12} sm={8} md={6} lg={4}>
                  <a href={site.homepage} target="_blank" rel="noreferrer noopener">
                    <img src={`/sites-logo/${site.name}.webp`} alt={site.name} />
                  </a>
                </Col>
              ))}
            </Row>
          </div>

          <Divider>
            <Link to={ROUTE_REGISTER}>
              <Button type="primary" size="large" icon={<FormOutlined />}>
                Create free account
              </Button>
            </Link>
          </Divider>

          <div className="text-align-center">
            <p>For the term & condition as well as other</p>
            <p>
              legal issues, please consult our <Link to={ROUTE_LEGAL_NOTICE}>Legal notice</Link>
            </p>
            <p id="contact">
              <b>Contact me at</b>
            </p>
            <a href={LINK_EMAIL} rel="noopener noreferrer" target="_blank">
              <MailOutlined className="footer-icon" />
              Email
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href={LINK_GITHUB} rel="noopener noreferrer" target="_blank">
              <GithubOutlined className="footer-icon" />
              Github
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href={LINK_LINKEDIN} rel="noopener noreferrer" target="_blank">
              <LinkedinOutlined className="footer-icon" />
              Linkedin
            </a>
          </div>

          <div className="for-dev">
            <Title level={2}>For developers</Title>
            <div>
              <p>
                This website is an opensource project. You can visit the &nbsp;&nbsp;
                <a href={LINK_GITHUB} target="_blank" rel="noreferrer noopener">
                  <Button icon={<GithubOutlined />}>Github repo</Button>
                </a>
              </p>
              <p>
                Pull requests with improvements or new features are more than welcome but the author reserves the rights
                or reject at will.
              </p>
              <p>
                The API for this website also run on this domain. Here&apos;s the &nbsp;&nbsp;
                <a href={ROUTE_API_DOC} target="_blank" rel="noreferrer noopener">
                  <Button icon={<DatabaseOutlined />}>API doc</Button>
                </a>
              </p>
              <p>
                If you encounter an issue with the way the page is displayed, forms, page logic or anything please open
                an issue on the &nbsp;&nbsp;
                <a href={LINK_GITHUB} target="_blank" rel="noreferrer noopener">
                  <Button icon={<BugOutlined />}>Issue tracker</Button>
                </a>
              </p>
            </div>
          </div>

          <div className="text-align-center power-by">
            <Title level={2}>Powered by</Title>
            <Row>
              <Col xs={24} md={8}>
                <a href="https://ant.design" rel="noopener noreferrer" target="_blank">
                  <img src={ANT_DESIGN_LOGO} alt="ant design" />
                </a>
              </Col>
              <Col xs={24} md={8}>
                <a href="https://expressjs.com/" rel="noopener noreferrer" target="_blank">
                  <img src={EXPRESS_JS_LOGO} alt="express js" />
                </a>
              </Col>
              <Col xs={24} md={8}>
                <a href="https://www.mongodb.com/" rel="noopener noreferrer" target="_blank">
                  <img src={MONGO_DB_LOGO} alt="" />
                </a>
              </Col>
              <Col xs={0} md={4} />
              <Col xs={24} md={8}>
                <a href="https://looka.com" rel="noopener noreferrer" target="_blank">
                  <img src={LOOKA_LOGO} alt="looka" />
                </a>
              </Col>
              <Col xs={24} md={8}>
                <a href="https://www.heroku.com/" rel="noopener noreferrer" target="_blank">
                  <img src={HEROKU_LOGO} alt="heroku" />
                </a>
              </Col>
              <Col xs={0} md={4} />
            </Row>
          </div>

          <div className="text-align-center back-to-top">
            <Button type="link" size="large" icon={<ArrowUpOutlined />} onClick={scrollToTop}>
              Back to top
            </Button>
          </div>
        </div>
      </Layout>

      <Footer />
    </Layout>
  );
};

export default Home;
