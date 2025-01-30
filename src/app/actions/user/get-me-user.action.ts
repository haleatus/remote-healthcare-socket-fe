"use server";

import { getMeUserService } from "@/app/services/user/get-me-user.service";
import { cookies } from "next/headers";

export async function getMeUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return null;
  }

  const meUser = await getMeUserService(accessToken.value);

  if (!meUser) {
    return null;
  }

  return meUser;
}
