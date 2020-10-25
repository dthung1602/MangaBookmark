import React, { useContext } from "react";
import { Avatar } from "antd";

import { GoogleButton, FacebookButton } from "../SocialNetworkButton";
import { GlobalContext } from "../GlobalContext";

const LinkedAccount = () => {
  const [{ user }] = useContext(GlobalContext);

  return (
    <div>
      {user.googleId ? (
        <>
          You are linked to Google account &nbsp; <Avatar src={user.googlePic} />
          <GoogleButton type="unlink" />
        </>
      ) : (
        <>
          You have not linked to any Google account
          <GoogleButton type="link" />
        </>
      )}

      <br />
      <br />

      {user.facebookId ? (
        <>
          You are linked to Facebook account &nbsp; <Avatar src={user.facebookPic} />
          <FacebookButton type="unlink" />
        </>
      ) : (
        <>
          You have not linked to any Facebook account
          <FacebookButton type="link" />
        </>
      )}
    </div>
  );
};

export default LinkedAccount;
