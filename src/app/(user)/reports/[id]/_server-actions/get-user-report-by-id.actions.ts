"use server";

import { getUserReportByIdService } from "@/app/(user)/reports/[id]/_services/get-user-report-by-id.service";
import { Report } from "@/core/interface/reports.interface";

export async function getUserReportById(
  accessToken: string,
  id: number
): Promise<{ data: Report | null; error?: string }> {
  try {
    const response = await getUserReportByIdService(accessToken, id);

    if (!response) {
      return { data: null, error: "Report not found" };
    }

    if ("data" in response && response.statusCode === 200) {
      return { data: response.data };
    }

    return { data: null, error: "Unable to load report" };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Report not found",
    };
  }
}
