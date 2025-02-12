"use server";

import { getApprovedApplicationByMeDoctorService } from "../_services/get-approved-application-by-me-doctor.service";

export async function getApprovedApplicationByMeDoctorAction({
  accessToken,
}: {
  accessToken: string;
}) {
  const doctorApprovedApplicationsByMe =
    await getApprovedApplicationByMeDoctorService(accessToken);

  if (!doctorApprovedApplicationsByMe) {
    return null;
  }

  return doctorApprovedApplicationsByMe;
}
