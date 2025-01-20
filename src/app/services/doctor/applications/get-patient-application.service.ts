import "server-only";
import { endpoints } from "@/core/contants/endpoints";

export const getPatientApplicationService = async (accessToken: string) => {
  const res = await fetch(
    endpoints.doctor.applications.getPatientApplications,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const patientApplications = await res.json();

  if (!res.ok) {
    const error = new Error(patientApplications.message);
    throw error;
  }

  return patientApplications;
};
