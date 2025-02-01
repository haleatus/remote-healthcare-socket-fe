"use server";

import { deletePatientReportService } from "../_services/delete-patient-report.service";

export async function deletePatientReportAction(
  accessToken: string,
  reportId: number
) {
  const deletePatientReports = await deletePatientReportService(
    accessToken,
    reportId
  );

  if (!deletePatientReports) {
    return null;
  }

  return deletePatientReports;
}
