import { Divider } from "antd";

import AuthLayout from "../BoxLayout";
import { LoginForm, SocialNetworkButton } from "../../components";

const { FacebookButton, GoogleButton } = SocialNetworkButton;

const Login = () => {
  return (
    <AuthLayout showFooter={false} title="login">
      <LoginForm />
      <Divider>or</Divider>
      <GoogleButton action="login" />
      <FacebookButton action="login" />
    </AuthLayout>
  );
};

export default Login;
