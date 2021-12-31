import { Divider } from "antd";
import { Link } from "react-router-dom";

import AuthLayout from "../BoxLayout";
import { RegisterForm, SocialNetworkButton } from "../../components";
import { ROUTE_LOGIN } from "../../utils/constants";

const { FacebookButton, GoogleButton } = SocialNetworkButton;

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
