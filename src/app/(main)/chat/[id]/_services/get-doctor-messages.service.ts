import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const getDoctorMessagesService = async (
  accessToken: string,
  applicationId: number
) => {
  const res = await fetch(
    endpoints.doctor.chat.getChatMessages.replace(
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

  const doctorMessages = await res.json();

  if (!res.ok) {
    const error = new Error(doctorMessages.message);
    throw error;
  }

  return doctorMessages;
};
