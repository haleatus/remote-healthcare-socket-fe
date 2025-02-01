/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { updateDoctorApplicationSchema } from "@/app/schema/applications";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";

export const updateDoctorApplicationService = async (
  data: z.infer<typeof updateDoctorApplicationSchema>,
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

  const updateDoctorApplication = await res.json();

  if (!res.ok) {
    const error = new Error(updateDoctorApplication.message);
    (error as any).fieldErrors = updateDoctorApplication.error;
    throw error;
  }

  return updateDoctorApplication;
};
