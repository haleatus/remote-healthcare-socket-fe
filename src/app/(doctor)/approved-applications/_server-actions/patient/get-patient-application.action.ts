"use server";

import { getPatientApplicationService } from "@/app/(doctor)/approved-applications/_services/patient/get-patient-application.service";

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
