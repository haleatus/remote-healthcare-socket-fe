"use server";

import { getMyMedicationService } from "@/app/services/user/medications/get-my-medication.service";

export async function getMyMedicationsAction({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) {
  const myMedication = await getMyMedicationService(accessToken, userId);

  if (!myMedication) {
    return null;
  }

  return myMedication;
}
