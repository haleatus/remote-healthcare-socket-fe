import ChatServer from "@/app/(main)/chat/[id]/_server-components/chat.server";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: Promise<{ id: string }> | { id: string }; // Allow Promise for params
  searchParams: { [key: string]: string | undefined };
}

const ChatPage = async ({ params, searchParams }: ChatPageProps) => {
  const resolvedParams = await Promise.resolve(params); // Ensure params is resolved

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
