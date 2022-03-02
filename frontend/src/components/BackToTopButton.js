import { Button } from "antd";

import { scrollToTop } from "../utils";

const style = { margin: "20px 0" };

const BackToTopButton = () => {
  return (
    <Button block type="link" style={style} onClick={scrollToTop}>
      ↑ Back to top
    </Button>
  );
};

export default BackToTopButton;
