"use server";

import { cookies } from "next/headers";

export async function getCurrentDoctorAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const doctorAccessToken = cookieStore.get("doctorAccessToken");

  if (!doctorAccessToken) {
    return null;
  }

  try {
    return doctorAccessToken.value;
  } catch {
    return null;
  }
}
