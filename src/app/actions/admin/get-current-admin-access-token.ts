"use server";

import { cookies } from "next/headers";

export async function getCurrentAdminAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const adminAccessToken = cookieStore.get("adminAccessToken");

  if (!adminAccessToken) {
    return null;
  }

  try {
    return adminAccessToken.value;
  } catch {
    return null;
  }
}
