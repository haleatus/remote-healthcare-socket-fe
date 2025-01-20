import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getAllApplicationsService = async (adminAccessToken: string) => {
  const res = await fetch(endpoints.admin.applications.getAllApplications, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminAccessToken}`,
    },
  });

  const applications = await res.json();

  if (!res.ok) {
    const error = new Error(applications.message);
    throw error;
  }

  return applications;
};
