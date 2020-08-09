import React from "react";
import { Layout } from "antd";
import "./Mangas.less";

import { Desktop, Mobile } from "../components/ScreenSize";
import PageLayout from "./PageLayout";
import FAB from "../components/FAB";
import MangaTableDesktop from "../components/MangaTableDesktop";
import MangaTableMobile from "../components/MangaTableMobile";
import RightPanel from "../components/RightPanel";

const Mangas = () => {
  return (
    <PageLayout>
      <Layout>
        <Desktop>
          <MangaTableDesktop />
          <RightPanel />
        </Desktop>
        <Mobile>
          <MangaTableMobile />
        </Mobile>
        <FAB />
      </Layout>
    </PageLayout>
  );
};

export default Mangas;
