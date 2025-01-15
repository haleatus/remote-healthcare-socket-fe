"use server";

import { getUserReportByIdService } from "@/app/services/user/reports/get-user-report-by-id.service";

export async function getUserReportById(accessToken: string, id: number) {
  const userReport = await getUserReportByIdService(accessToken, id);

  if (!userReport) {
    return null;
  }

  return userReport;
}
