import ChatServer from "@/app/(main)/chat/[id]/_server-components/chat.server";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

const ChatPage = async ({ params, searchParams }: ChatPageProps) => {
  if (!params.id || !searchParams.patient || !searchParams.doctor) {
    notFound();
  }
  return (
    <div>
      <ChatServer
        id={params.id}
        patientName={searchParams.patient}
        doctorName={searchParams.doctor}
      />
    </div>
  );
};

export default ChatPage;
