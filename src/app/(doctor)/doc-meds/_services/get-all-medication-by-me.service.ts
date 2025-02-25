import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getAllMedicationByMeService = async (accessToken: string) => {
  const res = await fetch(
    endpoints.doctor.medication.getMedicationAssignedByMe,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const allMedicationsByMe = await res.json();

  if (!res.ok) {
    const error = new Error(allMedicationsByMe.message);
    throw error;
  }

  return allMedicationsByMe;
};
