"use server";

import { getPatientApplicationService } from "@/app/(doctor)/(applications)/patient-applications/_services/get-patient-application.service";

export async function getPatientApplicationsAction({
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
