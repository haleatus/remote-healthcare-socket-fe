/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";

import { addMedicationSchema } from "@/app/schema/medication";
import { addMedicationService } from "../_services/add-medication.service";
import {
  MedicationErrorResponse,
  MedicationSuccessResponse,
} from "@/core/interface/medication.interface";

export async function addMedicationAction(
  formData: z.infer<typeof addMedicationSchema>,
  accessToken: string
): Promise<{
  success: boolean;
  data?: MedicationSuccessResponse;
  error?: MedicationErrorResponse;
}> {
  try {
    console.log("formdata", formData);
    // Validate the input data
    const validatedData = addMedicationSchema.parse(formData);

    console.log("ajsk", validatedData);

    // Call the service
    const response = await addMedicationService(validatedData, accessToken);

    console.log("response", response);

    return {
      success: true,
      data: response as MedicationSuccessResponse,
    };
  } catch (error) {
    console.log("error", error);
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
