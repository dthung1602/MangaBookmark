import PropTypes from "prop-types";
import { Card, Layout } from "antd";

import DefaultLayout from "../DefaultLayout";
import { CornerImageSource } from "../../components";
import { randomFrom } from "../../utils";
import backgroundImages from "../../assets/background";
import "./BoxLayout.less";

const { Content } = Layout;

const BoxLayout = ({ title, children, showFooter = false, containerClass = "", extraContent = null }) => {
  const bgUrl = randomFrom(backgroundImages);

  return (
    <DefaultLayout showFooter={showFooter}>
      <Content className={`box-layout-content ${containerClass}`} style={{ backgroundImage: `url(${bgUrl})` }}>
        <Card title={title} className="box-layout-card">
          {children}
        </Card>
        {extraContent}
        <CornerImageSource url="https://wall.alphacoders.com" name="Wallpaper Abyss" />
      </Content>
    </DefaultLayout>
  );
};

BoxLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  extraContent: PropTypes.node,
  containerClass: PropTypes.string,
  showFooter: PropTypes.bool,
};

export default BoxLayout;
