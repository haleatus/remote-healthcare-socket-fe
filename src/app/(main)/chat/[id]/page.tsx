import ChatServer from "@/app/_server-components/chat/chat-server";
import React from "react";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { id } = await params;
  return (
    <div>
      <ChatServer id={id} />
    </div>
  );
};

export default ChatPage;
