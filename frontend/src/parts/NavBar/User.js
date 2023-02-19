import { useContext } from "react";

import { GlobalContext } from "../../components/GlobalContext";
import { Avatar } from "antd";

const User = () => {
  const [{ user }] = useContext(GlobalContext);
  let avatar;
  if (user) {
    avatar = user.avatar ? <Avatar src={user.avatar} /> : <Avatar>{user.username[0].toUpperCase()}</Avatar>;
    return (
      <div className="navbar-user">
        {avatar} &nbsp; {fillUserName(user.username)}
      </div>
    );
  }
  return (
    <div className="navbar-user">
      <Avatar>?</Avatar> &nbsp; {fillUserName("Anonymous")}
    </div>
  );
};

function fillUserName(username) {
  if (username.length < 20) {
    return (
      <>
        {username}
        {"\u00A0".repeat(20 - username.length)}
      </>
    );
  }
  return username;
}

export default User;
