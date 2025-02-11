import ChatServer from "@/app/(main)/chat/[id]/_server-components/chat.server";

interface ChatPageProps {
  params: { id: string };
}

const ChatPage = async ({ params }: ChatPageProps) => {
  return (
    <div>
      <ChatServer id={params.id} />
    </div>
  );
};

export default ChatPage;
