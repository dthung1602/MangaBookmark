import { useContext, useRef, useState } from "react";
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
import { useOnIntersectViewPort } from "../hooks";
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
import LOGO from "../assets/tech-logo/logo-invert.webp";
import TECH_LOGO_SPRITE from "../assets/tech-logo/tech-logo.webp";
import MANGA_SITE_LOGO_SPRITE from "../assets/manga-site-logo/manga-site-logo.webp";
import "./Home.less";

const { Title } = Typography;

const isLogoInViewPort = () => {
  const rect = document.querySelector(".logo img")?.getBoundingClientRect();
  return rect ? rect.bottom > 64 : false;
};

const Home = () => {
  const [{ supportedSites }] = useContext(GlobalContext);
  const [clickedYoutube, setClickedYoutube] = useState(false);
  const [hideLogo, setHideLogo] = useState(true);
  const logoRef = useRef(null);

  useOnIntersectViewPort(logoRef, () => setHideLogo(isLogoInViewPort()), { rootMargin: "-64px" });

  return (
    <Layout>
      <NavBar hideLogo={hideLogo} />

      <Layout>
        <div className="home">
          <div className="logo-container">
            <div className="logo">
              <img src={LOGO} alt="MangaBookmark" ref={logoRef} />
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
            <Divider>
              <Title level={2}>Quick tour</Title>
            </Divider>
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
                src={`https://i.ytimg.com/vi_webp/${EMBED_QUICK_TOUR_VIDEO_ID}/maxresdefault.webp`}
              />
            )}
          </div>

          <div className="text-align-center" id="supported-sites">
            <Divider>
              <Title level={2}>Supported sites</Title>
            </Divider>
            <div>
              {supportedSites.map((site) => (
                <a
                  key={site.name}
                  href={site.homepage}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={"img-" + site.name.toLowerCase()}
                  style={{ backgroundImage: `url(${MANGA_SITE_LOGO_SPRITE})` }}
                />
              ))}
            </div>
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
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href={LINK_GITHUB} rel="noopener noreferrer" target="_blank">
              <GithubOutlined className="footer-icon" />
              Github
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href={LINK_LINKEDIN} rel="noopener noreferrer" target="_blank">
              <LinkedinOutlined className="footer-icon" />
              Linkedin
            </a>
          </div>

          <div className="for-dev">
            <Divider>
              <Title level={2}>For developers</Title>
            </Divider>
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
            <Divider>
              <Title level={2}>Powered by</Title>
            </Divider>
            <Row>
              <Col xs={24} md={8}>
                <a
                  style={{ backgroundImage: `url("${TECH_LOGO_SPRITE}")` }}
                  className="img-ant-design-logo-light"
                  href="https://ant.design"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              </Col>
              <Col xs={24} md={8}>
                <a
                  style={{ backgroundImage: `url("${TECH_LOGO_SPRITE}")` }}
                  className="img-express-js-logo-light"
                  href="https://expressjs.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              </Col>
              <Col xs={24} md={8}>
                <a
                  style={{ backgroundImage: `url("${TECH_LOGO_SPRITE}")` }}
                  className="img-mongodb-logo"
                  href="https://www.mongodb.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              </Col>
              <Col xs={0} md={4} />
              <Col xs={24} md={8}>
                <a
                  style={{ backgroundImage: `url("${TECH_LOGO_SPRITE}")` }}
                  className="img-looka-logo"
                  href="https://looka.com"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              </Col>
              <Col xs={24} md={8}>
                <a
                  style={{ backgroundImage: `url("${TECH_LOGO_SPRITE}")` }}
                  className="img-heroku-logo"
                  href="https://www.heroku.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                />
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
