/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { z } from "zod";

import { updateReportForApplicationSchema } from "@/app/schema/reports";
import {
  IReportErrorResponse,
  IReportSuccessResponse,
} from "@/core/interface/report.interface";
import { updateReportForApplicationService } from "../_services/update-report-for-application.service";

export async function updateReportForApplicationAction(
  formData: z.infer<typeof updateReportForApplicationSchema>,
  accessToken: string
): Promise<{
  success: boolean;
  data?: IReportSuccessResponse;
  error?: IReportErrorResponse;
}> {
  try {
    // Validate the input data
    const validatedData = updateReportForApplicationSchema.parse(formData);

    // Call the service
    const response = await updateReportForApplicationService(
      validatedData,
      accessToken
    );

    return {
      success: true,
      data: response as IReportSuccessResponse,
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
