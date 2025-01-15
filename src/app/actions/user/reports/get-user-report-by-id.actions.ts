"use server";

import { getUserReportByIdService } from "@/app/services/user/reports/get-user-report-by-id.service";
import { Report } from "@/core/types/reports.interface";

export async function getUserReportById(
  accessToken: string,
  id: number
): Promise<Report | null> {
  try {
    const response = await getUserReportByIdService(accessToken, id);

    if (!response) {
      return null;
    }

    // Check if response matches our ReportResponse interface
    if ("data" in response && response.statusCode === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching report:", error);
    return null;
  }
}
