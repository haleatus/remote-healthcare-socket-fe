/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { updateDoctorApplicationSchema } from "@/app/schema/applications";

import { z } from "zod";

import {
  ApplicationSuccessResponse,
  ApplicationErrorResponse,
} from "@/core/types/application.interface";

import { updateDoctorApplicationService } from "@/app/(doctor)/approved-applications/_services/update-doctor-application.service";

export async function updateDoctorApplication(
  formData: z.infer<typeof updateDoctorApplicationSchema>,
  accessToken: string
): Promise<{
  success: boolean;
  data?: ApplicationSuccessResponse;
  error?: ApplicationErrorResponse;
}> {
  try {
    // Validate the input data
    const validatedData = updateDoctorApplicationSchema.parse(formData);

    // Call the service
    const response = await updateDoctorApplicationService(
      validatedData,
      accessToken
    );

    return {
      success: true,
      data: response as ApplicationSuccessResponse,
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
