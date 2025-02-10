import ChatServer from "@/app/_server-components/chat/chat-server";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

const ChatPage = async ({ params, searchParams }: ChatPageProps) => {
  if (!params.id || !searchParams.user || !searchParams.doctor) {
    notFound();
  }

  return (
    <div>
      <ChatServer
        id={params.id}
        userName={searchParams.user}
        doctorName={searchParams.doctor}
      />
    </div>
  );
};

export default ChatPage;
