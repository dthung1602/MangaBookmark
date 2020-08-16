import React from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";

const { Footer, Header, Content, Sider } = Layout;
const Home = () => {
  return (
    <Layout>
      <Redirect to={"/mangas"} />
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
