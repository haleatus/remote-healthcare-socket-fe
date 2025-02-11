import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import ChatClient from "@/components/chat/chat.client";
import { redirect } from "next/navigation";
import { getPatientMessagesAction } from "../_server-actions/get-patient-messages.action";
import { getDoctorMessagesAction } from "../_server-actions/get-doctor-messages.action";
import { getCurrentUserFromCookie } from "@/app/actions/user/get-current-user-from-cookie.action";

interface ChatServerProps {
  id: string;
}

const ChatServer = async ({ id }: ChatServerProps) => {
  const accessToken = await getCurrentUserAccessToken();
  const userData = await getCurrentUserFromCookie();

  if (!accessToken || !userData) {
    redirect("/signin");
  }

  let messagesForApplication;

  if (userData.isAdmin) {
    messagesForApplication = await getDoctorMessagesAction({
      accessToken,
      applicationId: parseInt(id),
    });
  } else {
    messagesForApplication = await getPatientMessagesAction({
      accessToken,
      applicationId: parseInt(id),
    });
  }

  return (
    <div>
      <ChatClient
        id={id}
        messagesForApplication={messagesForApplication.data}
        accessToken={accessToken}
        ifDoctor={userData.isAdmin}
      />
    </div>
  );
};

export default ChatServer;
