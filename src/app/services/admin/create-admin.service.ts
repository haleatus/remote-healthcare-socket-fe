/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { endpoints } from "@/core/contants/endpoints";
import { createAdminSchema } from "@/app/schema/admin";
import { z } from "zod";
import { AuthErrorResponse } from "@/core/types/auth.interface";

export const createAdminService = async (
  data: z.infer<typeof createAdminSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.admin.createAdmin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const newAdmin: AuthErrorResponse = await res.json();

  if (!res.ok) {
    // Create a structured error object that includes both the message and specific field errors
    const error = new Error(newAdmin.message);
    (error as any).fieldErrors = newAdmin.error;
    throw error;
  }

  return newAdmin;
};
