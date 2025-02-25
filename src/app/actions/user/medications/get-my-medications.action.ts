"use server";

import { getMyMedicationService } from "@/app/services/user/medications/get-my-medication.service";
import { cookies } from "next/headers";
import { getCurrentUserFromCookie } from "../get-current-user-from-cookie.action";

export async function getMyMedicationsAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");
  const user = await getCurrentUserFromCookie();

  if (!accessToken || !user) {
    return;
  }

  const myMedication = await getMyMedicationService(
    accessToken.value,
    user.id.toString()
  );

  if (!myMedication) {
    return null;
  }

  return myMedication;
}
