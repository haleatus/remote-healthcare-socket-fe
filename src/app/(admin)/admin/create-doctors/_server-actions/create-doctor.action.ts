/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createDoctorSchema } from "@/app/schema/doctor";
import { createDoctorService } from "@/app/services/auth/doctor-auth.service";
import {
  AuthErrorResponse,
  AuthSuccessResponse,
} from "@/core/interface/auth.interface";
import { z } from "zod";

export async function createDoctorAction(
  formData: z.infer<typeof createDoctorSchema>,
  adminAccessToken: string
): Promise<{
  success: boolean;
  data?: AuthSuccessResponse;
  error?: AuthErrorResponse;
}> {
  try {
    // Validate the input data
    const validatedData = createDoctorSchema.parse(formData);

    // Call the service
    const response = await createDoctorService(validatedData, adminAccessToken);

    return {
      success: true,
      data: response as AuthSuccessResponse,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          statusCode: 400,
          timestamp: new Date().toISOString(),
          message: error.errors.map((e) => `${e.message}`).join(", "),
          error: error.errors.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.path[0]]: curr.message,
            }),
            {}
          ),
          data: {},
        },
      };
    }

    // Handle service errors
    if (error instanceof Error && "fieldErrors" in error) {
      return {
        success: false,
        error: {
          statusCode: 409,
          timestamp: new Date().toISOString(),
          message: error.message,
          error: (error as any).fieldErrors,
          data: {},
        },
      };
    }

    // Handle unexpected errors
    return {
      success: false,
      error: {
        statusCode: 500,
        timestamp: new Date().toISOString(),
        message: "An unexpected error occurred",
        error: {},
        data: {},
      },
    };
  }
}
