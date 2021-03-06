import { Divider } from "antd";

import AuthLayout from "./AuthLayout";
import RegisterForm from "../components/RegisterForm";
import { FacebookButton, GoogleButton } from "../components/SocialNetworkButton";
import { Link } from "react-router-dom";
import { ROUTE_LOGIN } from "../utils/constants";

const Register = () => {
  return (
    <AuthLayout showFooter={false} title="register">
      <RegisterForm />
      <Divider>or</Divider>
      <GoogleButton action="register" />
      <FacebookButton action="register" />
      <div className="auth-other-actions-footer">
        <Link to={ROUTE_LOGIN}>Already have an account? Login</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
