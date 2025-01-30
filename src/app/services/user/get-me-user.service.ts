import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getMeUserService = async (accessToken: string) => {
  const res = await fetch(endpoints.user.getMeUser, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const meUser = await res.json();

  if (!res.ok) {
    const error = new Error(meUser.message);
    throw error;
  }

  return meUser;
};
