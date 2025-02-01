"use server";

import { getApplicationByDoctorService } from "@/app/(doctor)/(applications)/approved-applications/_services/get-application-by-doctor.service";

export async function getApplicationByDoctorAction({
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
