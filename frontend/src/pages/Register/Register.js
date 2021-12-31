import { Divider } from "antd";
import { Link } from "react-router-dom";

import BoxLayout from "../BoxLayout";
import { RegisterForm } from "../../parts";
import { SocialNetworkButton } from "../../components";
import { ROUTE_LOGIN } from "../../utils/constants";
import "./Register.less";

const { FacebookButton, GoogleButton } = SocialNetworkButton;

const Register = () => {
  return (
    <BoxLayout showFooter={false} title="register">
      <RegisterForm />
      <Divider>or</Divider>
      <GoogleButton action="register" />
      <FacebookButton action="register" />
      <div className="register-other-actions">
        <Link to={ROUTE_LOGIN}>Already have an account? Login</Link>
      </div>
    </BoxLayout>
  );
};

export default Register;
