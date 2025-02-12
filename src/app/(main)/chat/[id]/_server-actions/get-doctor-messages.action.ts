"use server";

import { getDoctorMessagesService } from "../_services/get-doctor-messages.service";

export async function getDoctorMessagesAction({
  accessToken,
  applicationId,
}: {
  accessToken: string;
  applicationId: number;
}) {
  const doctorMessages = await getDoctorMessagesService(
    accessToken,
    applicationId
  );

  if (!doctorMessages) {
    return null;
  }

  return doctorMessages;
}
