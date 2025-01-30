"use server";

import { getAllUserService } from "@/app/services/user/general/get-all-user.service";
import { cookies } from "next/headers";

export async function getAllUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return null;
  }

  const allUser = await getAllUserService(accessToken.value);

  if (!allUser) {
    return null;
  }

  return allUser;
}
