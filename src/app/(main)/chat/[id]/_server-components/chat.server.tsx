import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import ChatClient from "@/components/chat/chat.client";
import { redirect } from "next/navigation";
import { getPatientMessagesAction } from "../_server-actions/get-patient-messages.action";
import { getDoctorMessagesAction } from "../_server-actions/get-doctor-messages.action";

interface ChatServerProps {
  id: string;
  userName: string;
  doctorName: string;
}

const ChatServer = async ({ id, userName, doctorName }: ChatServerProps) => {
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken) {
    redirect("/signin");
  }

  const messageSentByPatient = await getPatientMessagesAction({
    accessToken,
    applicationId: parseInt(id),
  });

  const messageSentByDoctor = await getDoctorMessagesAction({
    accessToken,
    applicationId: parseInt(id),
  });

  console.log("messageSentByPatient", messageSentByPatient);
  console.log("messageSentByDoctor", messageSentByDoctor);

  return (
    <div>
      <ChatClient
        id={id}
        userName={userName}
        doctorName={doctorName}
        messageSentByPatient={messageSentByPatient}
        messageSentByDoctor={messageSentByDoctor}
      />
    </div>
  );
};

export default ChatServer;
