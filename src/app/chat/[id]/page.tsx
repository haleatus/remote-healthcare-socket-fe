import ChatServer from "@/app/_components/chat/chat-server";
import React from "react";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage = ({ params }: ChatPageProps) => {
  const id = params.id;
  return (
    <div>
      <ChatServer id={id} />
    </div>
  );
};

export default ChatPage;
