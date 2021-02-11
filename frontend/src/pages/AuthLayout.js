import PropTypes from "prop-types";
import { Card, Layout } from "antd";

import PageLayout from "./PageLayout";
import CornerImageSource from "../components/CornerImageSource";
import { Desktop } from "../components/ScreenSize";
import { randomFrom } from "../utils";
import backgroundImages from "../assets/background";
import "./AuthLayout.less";

const { Content } = Layout;

const AuthLayout = ({ showFooter = false, title, children }) => {
  const bgUrl = randomFrom(backgroundImages);

  return (
    <PageLayout showFooter={showFooter}>
      <Content className="card-form-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <Card title={title} className="card-form">
          {children}
        </Card>
        <Desktop>
          <CornerImageSource url="https://wall.alphacoders.com" name="Wallpaper Abyss" />
        </Desktop>
      </Content>
    </PageLayout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  showFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default AuthLayout;
