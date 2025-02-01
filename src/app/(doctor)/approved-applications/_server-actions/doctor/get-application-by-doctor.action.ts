"use server";

import { getApplicationByDoctorService } from "@/app/(doctor)/approved-applications/_services/get-application-by-doctor.service";

export async function getApplicationByDoctor({
  accessToken,
}: {
  accessToken: string;
}) {
  const doctorApplications = await getApplicationByDoctorService(accessToken);

  if (!doctorApplications) {
    return null;
  }

  return doctorApplications;
}
