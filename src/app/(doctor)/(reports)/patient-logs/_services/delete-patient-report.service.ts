import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const deletePatientReportService = async (
  accessToken: string,
  reportId: number
) => {
  const res = await fetch(
    endpoints.doctor.reports.deleteRecord.replace(":id", reportId.toString()),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const deletePatientReport = await res.json();

  if (!res.ok) {
    const error = new Error(deletePatientReport.message);
    throw error;
  }

  return deletePatientReport;
};
