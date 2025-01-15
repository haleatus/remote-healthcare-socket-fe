/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserApplicationSchema } from "@/app/schema/applications";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";

export const createuserApplicationService = async (
  data: z.infer<typeof createUserApplicationSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.user.applications.createUserApplication, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const newUserApplication = await res.json();

  if (!res.ok) {
    const error = new Error(newUserApplication.message);
    (error as any).fieldErrors = newUserApplication.error;
    throw error;
  }

  return newUserApplication;
};
