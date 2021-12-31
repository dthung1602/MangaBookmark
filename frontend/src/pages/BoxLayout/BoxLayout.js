import PropTypes from "prop-types";
import { Card, Layout } from "antd";

import DefaultLayout from "../DefaultLayout";
import { CornerImageSource, ScreenSize } from "../../components";
import { randomFrom } from "../../utils";
import backgroundImages from "../../assets/background";
import "./BoxLayout.less";

const { Content } = Layout;
const { Desktop } = ScreenSize;

const BoxLayout = ({ showFooter = false, title, children }) => {
  const bgUrl = randomFrom(backgroundImages);

  return (
    <DefaultLayout showFooter={showFooter}>
      <Content className="card-form-container" style={{ backgroundImage: `url(${bgUrl})` }}>
        <Card title={title} className="card-form">
          {children}
        </Card>
        <Desktop>
          <CornerImageSource url="https://wall.alphacoders.com" name="Wallpaper Abyss" />
        </Desktop>
      </Content>
    </DefaultLayout>
  );
};

BoxLayout.propTypes = {
  children: PropTypes.node,
  showFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default BoxLayout;
