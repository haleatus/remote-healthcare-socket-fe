/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";
import { addMedicationSchema } from "@/app/schema/medication";

export const addMedicationService = async (
  data: z.infer<typeof addMedicationSchema>,
  accessToken: string
) => {
  console.log("wiii", data);

  const res = await fetch(endpoints.doctor.medication.addMedication, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  console.log("res", res);

  const addMedication = await res.json();

  if (!res.ok) {
    const error = new Error(addMedication.message);
    (error as any).fieldErrors = addMedication.error;
    throw error;
  }

  return addMedication;
};
