import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getAllDoctorAdminService = async (accessToken: string) => {
  const res = await fetch(endpoints.doctor.generalapi.getAllDoctors, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const allDoctors = await res.json();

  if (!res.ok) {
    const error = new Error(allDoctors.message);
    throw error;
  }

  return allDoctors;
};
