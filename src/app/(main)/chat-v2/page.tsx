import { getCurrentUserAccessToken } from "@/app/actions/user/get-current-user-access-token";
import MedicalChat from "@/components/chat/medical-chat";
import { SocketProvider } from "@/context/socket-context";
import { redirect } from "next/navigation";

const ChatComponent = async () => {
  const appointmentId = "37"; // Get from your app state/props
  const token = await getCurrentUserAccessToken();

  if (!token) {
    redirect("/signin");
  }

  return (
    <SocketProvider appointmentId={appointmentId} token={token}>
      <MedicalChat />
    </SocketProvider>
  );
};

export default ChatComponent;
