"use server";

import { cookies } from "next/headers";
import { getAllMedicationService } from "../_services/get-all-medication.service";

export async function getAllMedicationAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return;
  }

  const allMedications = await getAllMedicationService(accessToken.value);

  if (!allMedications) {
    return null;
  }

  return allMedications;
}
