import React, { useContext } from "react";

import { GlobalContext } from "../GlobalContext";
import { Avatar } from "antd";

const User = () => {
  const [{ user }] = useContext(GlobalContext);
  let avatar;
  if (user) {
    if (user.primaryAccount === "local") {
      avatar = <Avatar>{user.username[0].toUpperCase()}</Avatar>;
    } else {
      const picURL = user[user.primaryAccount + "Pic"];
      avatar = <Avatar src={picURL} />;
    }
    return (
      <div>
        {avatar} &nbsp; &nbsp; {user.username}
      </div>
    );
  }
  return "Login";
};

export default User;
