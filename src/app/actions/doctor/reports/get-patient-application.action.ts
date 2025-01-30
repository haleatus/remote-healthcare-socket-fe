"use server";

import { getPatientReportsService } from "@/app/services/doctor/reports/patient/get-patient-reports.service";

export async function getPatientReports({
  accessToken,
}: {
  accessToken: string;
}) {
  const patientReports = await getPatientReportsService(accessToken);

  if (!patientReports) {
    return null;
  }

  return patientReports;
}
