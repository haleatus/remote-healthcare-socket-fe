import { endpoints } from "@/core/contants/endpoints";

export const getUserReportByIdService = async (
  accessToken: string,
  id: number
) => {
  const res = await fetch(
    endpoints.user.reports.getReportById.replace(":id", id.toString()),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const userReport = await res.json();

  if (!res.ok) {
    const error = new Error(userReport.message);
    console.error("Error fetching report:", error);
  }

  return userReport;
};
