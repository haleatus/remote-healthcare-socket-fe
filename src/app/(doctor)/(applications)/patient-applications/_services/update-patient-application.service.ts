/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { updateUserApplicationSchema } from "@/app/schema/applications";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";

export const updatePatientApplicationService = async (
  data: z.infer<typeof updateUserApplicationSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.doctor.applications.updateApplication, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const newDoctorApplication = await res.json();

  if (!res.ok) {
    const error = new Error(newDoctorApplication.message);
    (error as any).fieldErrors = newDoctorApplication.error;
    throw error;
  }

  return newDoctorApplication;
};
