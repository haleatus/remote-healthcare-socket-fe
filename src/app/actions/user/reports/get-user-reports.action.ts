"use server";

import { getUserReportsService } from "@/app/services/user/reports/get-user-reports.service";
import { Report } from "@/core/types/reports.interface";

export async function getUserReports(
  accessToken: string
): Promise<Report[] | null> {
  try {
    const response = await getUserReportsService(accessToken);

    if (!response) {
      return null;
    }

    // If the response is a ReportSuccessResponse, extract the data array
    if ("data" in response && Array.isArray(response.data)) {
      return response.data as Report[];
    }

    // If the response is already an array of reports
    if (Array.isArray(response)) {
      return response;
    }

    // If we get a single report, wrap it in an array
    if ("id" in response) {
      return [response as Report];
    }

    return null;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return null;
  }
}
