"use server";

import { cookies } from "next/headers";
import { getAllMedicationByMeService } from "../_services/get-all-medication-by-me.service";

export async function getAllMedicationByMeAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return;
  }

  const allMedicationsByMe = await getAllMedicationByMeService(
    accessToken.value
  );

  if (!allMedicationsByMe) {
    return null;
  }

  return allMedicationsByMe;
}
