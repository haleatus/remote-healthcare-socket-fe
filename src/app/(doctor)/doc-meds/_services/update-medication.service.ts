/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";
import { updateMedicationSchema } from "@/app/schema/medication";

export const updateMedicationService = async (
  data: z.infer<typeof updateMedicationSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.doctor.medication.updateMedication, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const updateMedication = await res.json();

  if (!res.ok) {
    const error = new Error(updateMedication.message);
    (error as any).fieldErrors = updateMedication.error;
    throw error;
  }

  return updateMedication;
};
