/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { updateUserApplicationSchema } from "@/app/schema/applications";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";

export const updateUserApplicationService = async (
  data: z.infer<typeof updateUserApplicationSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.user.applications.updateUserApplication, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const updateUserApplication = await res.json();

  if (!res.ok) {
    const error = new Error(updateUserApplication.message);
    (error as any).fieldErrors = updateUserApplication.error;
    throw error;
  }

  return updateUserApplication;
};
