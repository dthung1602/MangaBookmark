import React from "react";
import { Layout } from "antd";

const { Footer, Header, Content, Sider } = Layout;
const Home = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
        <Sider theme={"light"}>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Home;
