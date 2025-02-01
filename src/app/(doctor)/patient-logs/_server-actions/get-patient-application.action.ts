"use server";

import { getPatientReportsService } from "@/app/(doctor)/patient-logs/_services/get-patient-reports.service";

export async function getPatientReportsAction(accessToken: string) {
  const patientReports = await getPatientReportsService(accessToken);

  if (!patientReports) {
    return null;
  }

  return patientReports;
}
