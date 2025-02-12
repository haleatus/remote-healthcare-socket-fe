import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getAllDoctorAdminService = async (accessToken: string) => {
  const res = await fetch(endpoints.admin.getAllDoctors, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const allDoctors = await res.json();

  return allDoctors;
};
