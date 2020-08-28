import React from "react";
import { Divider } from "antd";

import AuthLayout from "./AuthLayout";
import LoginForm from "../components/LoginForm";
import { FacebookButton, GoogleButton } from "../components/SocialNetworkButton";

const Login = () => {
  return (
    <AuthLayout showFooter={false} title="login">
      <LoginForm />
      <Divider>or</Divider>
      <GoogleButton>Login with Google</GoogleButton>
      <FacebookButton>Login with Facebook</FacebookButton>
    </AuthLayout>
  );
};

export default Login;
