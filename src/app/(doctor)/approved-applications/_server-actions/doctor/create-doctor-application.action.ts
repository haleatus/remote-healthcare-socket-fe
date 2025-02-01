/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createDoctorApplicationSchema } from "@/app/schema/applications";

import { z } from "zod";

import {
  ApplicationErrorResponse,
  DoctorApplicationSuccessResponse,
} from "@/core/types/application.interface";
import { createDoctorApplicationService } from "@/app/(doctor)/approved-applications/_services/create-doctor-application.service";

export async function createDoctorApplication(
  formData: z.infer<typeof createDoctorApplicationSchema>,
  accessToken: string
): Promise<{
  success: boolean;
  data?: DoctorApplicationSuccessResponse;
  error?: ApplicationErrorResponse;
}> {
  try {
    // Validate the input data
    const validatedData = createDoctorApplicationSchema.parse(formData);

    // Call the service
    const response = await createDoctorApplicationService(
      validatedData,
      accessToken
    );

    return {
      success: true,
      data: response as DoctorApplicationSuccessResponse,
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
