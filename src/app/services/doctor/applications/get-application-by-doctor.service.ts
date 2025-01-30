import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const getApplicationByDoctorService = async (accessToken: string) => {
  const res = await fetch(
    endpoints.doctor.applications.getApplicationsByDoctor,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const doctorApplications = await res.json();

  if (!res.ok) {
    const error = new Error(doctorApplications.message);
    throw error;
  }

  return doctorApplications;
};
