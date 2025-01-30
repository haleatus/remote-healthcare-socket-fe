import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getMeAdminService = async (adminAccessToken: string) => {
  const res = await fetch(endpoints.admin.getMeAdmin, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminAccessToken}`,
    },
  });

  const meAdmin = await res.json();

  if (!res.ok) {
    const error = new Error(meAdmin.message);
    throw error;
  }

  return meAdmin;
};
