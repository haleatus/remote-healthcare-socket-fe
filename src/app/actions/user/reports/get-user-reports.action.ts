"use server";

import { getUserReportsService } from "@/app/services/user/reports/get-user-reports.service";

export async function getUserReports(accessToken: string) {
  const userReports = await getUserReportsService(accessToken);

  if (!userReports) {
    return null;
  }

  return userReports;
}
