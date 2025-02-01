import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const getPatientReportsService = async (accessToken: string) => {
  const res = await fetch(endpoints.doctor.reports.getAllRecords, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const patientReports = await res.json();

  if (!res.ok) {
    const error = new Error(patientReports.message);
    throw error;
  }

  return patientReports;
};
