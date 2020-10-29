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
      <GoogleButton action="login" />
      <FacebookButton action="login" />
    </AuthLayout>
  );
};

export default Login;
