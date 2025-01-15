import { endpoints } from "@/core/contants/endpoints";

export const getUserReportsService = async (accessToken: string) => {
  const res = await fetch(endpoints.user.reports.getAllReports, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userReports = await res.json();

  if (!res.ok) {
    const error = new Error(userReports.message);
    throw error;
  }

  return userReports;
};
