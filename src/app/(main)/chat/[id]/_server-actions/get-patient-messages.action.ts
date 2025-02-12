"use server";

import { getPatientMessagesService } from "../_services/get-patient-messages.service";

export async function getPatientMessagesAction({
  accessToken,
  applicationId,
}: {
  accessToken: string;
  applicationId: number;
}) {
  const patientMessages = await getPatientMessagesService(
    accessToken,
    applicationId
  );

  if (!patientMessages) {
    return null;
  }

  return patientMessages;
}
