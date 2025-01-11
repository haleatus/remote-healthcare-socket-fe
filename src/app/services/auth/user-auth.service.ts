/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserSchema } from "@/app/schema/user";
import { endpoints } from "@/core/contants/endpoints";
import { z } from "zod";

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: {
    password?: string;
    email?: string;
    name?: string;
  };
  data: any;
}

export const createUserService = async (
  data: z.infer<typeof createUserSchema>
) => {
  const res = await fetch(endpoints.auth.user.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const newUser: ErrorResponse = await res.json();

  if (!res.ok) {
    // Create a structured error object that includes both the message and specific field errors
    const error = new Error(newUser.message);
    (error as any).fieldErrors = newUser.error;
    throw error;
  }

  return newUser;
};
