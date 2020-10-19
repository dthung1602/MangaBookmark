import React, { useContext } from "react";

import { GlobalContext } from "../GlobalContext";
import { Avatar } from "antd";

const User = () => {
  const [{ user }] = useContext(GlobalContext);
  let avatar;
  if (user) {
    avatar = <Avatar src={user.avatar} />;
    return (
      <div className="navbar-user">
        {avatar} &nbsp; {user.username}
      </div>
    );
  }
  return (
    <div className="navbar-user">
      <Avatar>?</Avatar> &nbsp; Anonymous
    </div>
  );
};

export default User;
