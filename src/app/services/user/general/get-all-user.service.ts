import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const getAllUserService = async (accessToken: string) => {
  const res = await fetch(endpoints.user.generalapi.getAllUsers, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const allUser = await res.json();

  if (!res.ok) {
    const error = new Error(allUser.message);
    throw error;
  }

  return allUser;
};
