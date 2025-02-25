/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";

import { updateMedicationSchema } from "@/app/schema/medication";
import {
  MedicationErrorResponse,
  MedicationSuccessResponse,
} from "@/core/interface/medication.interface";
import { updateMedicationService } from "../_services/update-medication.service";

export async function updateMedicationAction(
  formData: z.infer<typeof updateMedicationSchema>,
  accessToken: string
): Promise<{
  success: boolean;
  data?: MedicationSuccessResponse;
  error?: MedicationErrorResponse;
}> {
  try {
    // Validate the input data
    const validatedData = updateMedicationSchema.parse(formData);

    // Call the service
    const response = await updateMedicationService(validatedData, accessToken);

    return {
      success: true,
      data: response as MedicationSuccessResponse,
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
