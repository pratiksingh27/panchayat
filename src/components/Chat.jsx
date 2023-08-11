import React, { useContext } from "react";
import Cam from "../img/cam.gif";
import Add from "../img/profile.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { UserContext } from "../context/UserContext";

const Chat = () => {
  const { data } = useContext(UserContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img className="Add" style={{height:"50px"}} src={Add} alt="" />
          <img src={More} style={{height:"50px"}} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;