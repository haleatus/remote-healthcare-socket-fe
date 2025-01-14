import { endpoints } from "@/core/contants/endpoints";

export const getUserApplicationService = async (accessToken: string) => {
  const res = await fetch(endpoints.user.applications.getUserApplications, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userApplication = await res.json();

  if (!res.ok) {
    const error = new Error(userApplication.message);
    throw error;
  }

  return userApplication;
};
