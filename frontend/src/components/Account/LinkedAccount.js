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
          <GoogleButton action="unlink" />
        </>
      ) : (
        <>
          You have not linked to any Google account
          <GoogleButton action="link" />
        </>
      )}

      <br />
      <br />

      {user.facebookId ? (
        <>
          You are linked to Facebook account &nbsp; <Avatar src={user.facebookPic} />
          <FacebookButton action="unlink" />
        </>
      ) : (
        <>
          You have not linked to any Facebook account
          <FacebookButton action="link" />
        </>
      )}
    </div>
  );
};

export default LinkedAccount;
