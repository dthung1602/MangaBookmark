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
          You are linked to Google account <Avatar src={user.googlePic} />
        </>
      ) : (
        <>You have not linked to any Google account</>
      )}
      <GoogleButton type="unlink" />

      <br />
      <br />

      {user.facebookId ? (
        <>
          You are linked to Facebook account <Avatar src={user.facebookPic} />
        </>
      ) : (
        <>You have not linked to any Facebook account</>
      )}
      <FacebookButton type="unlink" />
    </div>
  );
};

export default LinkedAccount;
