"use server";

import { getPatientApplicationService } from "@/app/services/doctor/applications/get-patient-application.service";

export async function getPatientApplications({
  accessToken,
}: {
  accessToken: string;
}) {
  const patientApplications = await getPatientApplicationService(accessToken);

  if (!patientApplications) {
    return null;
  }

  return patientApplications;
}
