import ChatClient from "@/components/chat/chat-client";

interface ChatServerProps {
  id: string;
  userName: string;
  doctorName: string;
}

const ChatServer = ({ id, userName, doctorName }: ChatServerProps) => {
  return (
    <div>
      <ChatClient id={id} userName={userName} doctorName={doctorName} />
    </div>
  );
};

export default ChatServer;
