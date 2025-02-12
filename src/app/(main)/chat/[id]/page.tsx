import ChatServer from "@/app/(main)/chat/[id]/_server-components/chat.server";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ChatPage = async ({ params, searchParams }: ChatPageProps) => {
  // Await both promises concurrently for better performance
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  if (
    !resolvedParams.id ||
    !resolvedSearchParams.patient ||
    !resolvedSearchParams.doctor
  ) {
    notFound();
  }

  return (
    <div>
      <ChatServer
        id={resolvedParams.id}
        patientName={resolvedSearchParams.patient as string}
        doctorName={resolvedSearchParams.doctor as string}
      />
    </div>
  );
};

export default ChatPage;
