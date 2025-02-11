import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const getApprovedApplicationByMeDoctorService = async (
  accessToken: string
) => {
  const res = await fetch(
    endpoints.doctor.applications.ownApprovedApplications,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const doctorApprovedApplicationsByMe = await res.json();

  if (!res.ok) {
    const error = new Error(doctorApprovedApplicationsByMe.message);
    throw error;
  }

  return doctorApprovedApplicationsByMe;
};
