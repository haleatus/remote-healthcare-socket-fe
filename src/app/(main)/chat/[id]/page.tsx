import ChatServer from "@/app/(main)/chat/[id]/_server-components/chat.server";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: { id: string } | Promise<{ id: string }>;
  searchParams: { [key: string]: string | undefined };
}

const ChatPage = async ({ params, searchParams }: ChatPageProps) => {
  const resolvedParams = await Promise.resolve(params);

  if (!resolvedParams.id || !searchParams.patient || !searchParams.doctor) {
    notFound();
  }

  return (
    <div>
      <ChatServer
        id={resolvedParams.id}
        patientName={searchParams.patient}
        doctorName={searchParams.doctor}
      />
    </div>
  );
};

export default ChatPage;
