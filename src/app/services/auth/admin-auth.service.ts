/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { signInAdminSchema } from "@/app/schema/admin";
import { endpoints } from "@/core/contants/endpoints";
import { AuthErrorResponse } from "@/core/interface/auth.interface";
import { z } from "zod";

export const signInAdminService = async (
  data: z.infer<typeof signInAdminSchema>
) => {
  const res = await fetch(endpoints.auth.admin.signin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const admin: AuthErrorResponse = await res.json();

  if (!res.ok) {
    const error = new Error(admin.message);
    (error as any).fieldErrors = admin.error;
    throw error;
  }

  return admin;
};
