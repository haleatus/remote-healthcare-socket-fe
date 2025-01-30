"use server";

import { IUser } from "@/core/types/user.interface";
import { cookies } from "next/headers";

export async function getCurrentUserFromCookie(): Promise<IUser | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get("userData");

  if (!userData) {
    return null;
  }

  try {
    return JSON.parse(userData.value);
  } catch {
    return null;
  }
}
