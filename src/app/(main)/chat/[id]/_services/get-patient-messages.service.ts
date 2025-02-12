import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const getPatientMessagesService = async (
  accessToken: string,
  applicationId: number
) => {
  const res = await fetch(
    endpoints.user.chat.getChatMessages.replace(
      ":appointmentId",
      applicationId.toString()
    ),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const patientMessages = await res.json();

  if (!res.ok) {
    const error = new Error(patientMessages.message);
    throw error;
  }

  return patientMessages;
};
