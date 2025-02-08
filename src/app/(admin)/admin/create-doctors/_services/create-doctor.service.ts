/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { endpoints } from "@/core/contants/endpoints";
import { z } from "zod";
import { AuthErrorResponse } from "@/core/interface/auth.interface";
import { createDoctorSchema } from "@/app/schema/doctor";

export const createDoctorService = async (
  data: z.infer<typeof createDoctorSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.auth.doctor.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const newDoctor: AuthErrorResponse = await res.json();

  if (!res.ok) {
    // Create a structured error object that includes both the message and specific field errors
    const error = new Error(newDoctor.message);
    (error as any).fieldErrors = newDoctor.error;
    throw error;
  }

  return newDoctor;
};
