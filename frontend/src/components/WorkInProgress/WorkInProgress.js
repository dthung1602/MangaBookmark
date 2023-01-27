import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Space, Grid } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import CornerImageSource from "../CornerImageSource";
import { ROUTE_HOME } from "../../utils/constants";
import workInProgressImageLong from "../../assets/wip-long.jpg";
import workInProgressImageFull from "../../assets/wip-full.jpg";
import "./WorkInProgress.less";

const { useBreakpoint } = Grid;

const WorkInProgress = () => {
  const navigate = useNavigate();
  const backHome = () => navigate(ROUTE_HOME);
  const back = () => navigate(-1);

  const imgSrc = useBreakpoint().lg ? workInProgressImageLong : workInProgressImageFull;

  useEffect(() => {
    document.body.classList.add("disable-scrolling");
    return () => document.body.classList.remove("disable-scrolling");
  }, []);

  return (
    <div className="work-in-progress">
      <img alt="Work in progress" src={imgSrc} />
      <CornerImageSource name="CargoCollective" url="http://cargocollective.com/pedrov/filter/bcp/Work-In-Progress" />
      <div className="work-in-progress-buttons">
        <Space size="middle">
          <Button size="large" icon={<ArrowLeftOutlined />} onClick={back}>
            Go back
          </Button>
          <Button size="large" type="primary" icon={<HomeOutlined />} onClick={backHome}>
            Go home
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default WorkInProgress;
