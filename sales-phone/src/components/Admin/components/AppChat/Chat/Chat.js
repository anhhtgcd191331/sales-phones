import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ListMessage from "./ListMessage";
import TypeMessage from "./TypeMessage";

function Chat() {
  let socket;
  const ENDPOINT = "localhost:5000";
  const [messages, setMessages] = useState([]);
  const { userInfo } = useSelector((state) => state.userSignin);
  const idConversation = useSelector((state) => state.chat.idConversation);
  const nameConversation = useSelector((state) => state.chat.nameConversation);

  useEffect(() => {
    if (!idConversation) return;
    const getAllMessageByConversation = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/chats/message?idConversation=${idConversation}`
      );
      setMessages(data.messageList);
    };
    getAllMessageByConversation();
  }, [idConversation]);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("admin_join_conversation", idConversation);

    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });

    return () => socket.disconnect();
  });

  useEffect(() => {
    const scrollMessage = () => {
      var element = document.querySelector(".ad-chatuser-listmessage");
      element.scrollTop = element.scrollHeight;
    };

    scrollMessage();
  });

  const handleFormSubmit = async (message) => {
    const sender = userInfo.name;

    const payload = {
      sender,
      message,
      idConversation,
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/chats/save",
      payload
    );
    socket.emit("chat", data);
  };
  return (
    <div className="ad-chatuser">
      <div className="ad-chatuser-user">
        <span className="ad-chatuser-user-name">{nameConversation}</span>
      </div>

      {messages ? <ListMessage messages={messages} user={userInfo} /> : ""}

      <TypeMessage onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Chat;
