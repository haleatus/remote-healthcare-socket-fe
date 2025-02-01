/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { deleteApplicationService } from "@/app/(doctor)/(applications)/approved-applications/_services/delete-application.service";
import { ApplicationSuccessResponse } from "@/core/interface/application.interface";

export async function deleteApplicationAction(
  accessToken: string,
  applicationId: number
) {
  try {
    const deleteApplication = await deleteApplicationService(
      applicationId,
      accessToken
    );

    return {
      success: true,
      data: deleteApplication as ApplicationSuccessResponse,
    };
  } catch (error) {
    // Handle service errors
    if (error instanceof Error && "fieldErrors" in error) {
      return {
        success: false,
        error: {
          statusCode: 404,
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
