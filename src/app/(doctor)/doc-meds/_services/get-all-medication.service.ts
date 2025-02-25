import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getAllMedicationService = async (accessToken: string) => {
  const res = await fetch(endpoints.doctor.medication.getAllMedicationCreated, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const allMedications = await res.json();

  if (!res.ok) {
    const error = new Error(allMedications.message);
    throw error;
  }

  return allMedications;
};
