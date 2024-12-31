import ChatClient from "@/components/chat/chat-client";
import React from "react";

const ChatServer = ({ id }: { id: string }) => {
  return (
    <div>
      <ChatClient id={id} />
    </div>
  );
};

export default ChatServer;
