import React from "react";
import "./style.css";
import Chat from "./Chat/Chat";
import Contact from "./Contact/Contact";

function AppChatAdmin() {
  return (
    <section id="appchat">
      <span>Messages</span>
      <div className="appchat">
        <Contact />
        <div className="chat">
          <Chat />
        </div>
      </div>
    </section>
  );
}

export default AppChatAdmin;
