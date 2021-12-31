import { Divider, Tooltip } from "antd";
import { Link } from "react-router-dom";

import BoxLayout from "../BoxLayout";
import { LoginForm } from "../../parts";
import { SocialNetworkButton } from "../../components";
import { ROUTE_REGISTER } from "../../utils/constants";
import "./Login.less";

const { FacebookButton, GoogleButton } = SocialNetworkButton;

const Login = () => {
  return (
    <BoxLayout showFooter={false} title="login">
      <LoginForm />
      <div className="login-other-actions">
        <Tooltip title="Sorry, haven't implemented yet :(">
          <a>Forgot password?</a>
        </Tooltip>
        <Link to={ROUTE_REGISTER}>Register</Link>
      </div>
      <Divider>or</Divider>
      <GoogleButton action="login" />
      <FacebookButton action="login" />
    </BoxLayout>
  );
};

export default Login;
