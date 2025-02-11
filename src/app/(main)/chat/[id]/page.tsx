import ChatServer from "@/app/(main)/chat/[id]/_server-components/chat.server";

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
