import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "../DefaultLayout";
import { ROUTE_HOME } from "../../utils/constants";
import ERROR_IMG from "../../assets/error.webp";

const NotFound = () => {
  const navigate = useNavigate();
  const backHome = () => navigate(ROUTE_HOME);

  document.title = "Not found | MangaBookmark";

  return (
    <DefaultLayout>
      <div className="ant-result">
        <div className="ant-result-icon ant-result-image">
          <img src={ERROR_IMG} alt="404" style={{ width: "100%" }} />
        </div>
        <div className="ant-result-title">Error 404</div>
        <div className="ant-result-subtitle">
          The page you visited does not exist.
          <br />
          What you can do:
        </div>
        <div className="ant-result-extra">
          <Button type="primary" icon={<HomeOutlined />} onClick={backHome}>
            Go home (and please don&apos;t die)
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NotFound;
