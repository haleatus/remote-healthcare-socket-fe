"use server";

import { cookies } from "next/headers";
import { getAllDoctorAdminService } from "../_services/get-all-doctor-admin.service";

export async function getAllDoctorAdmin() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("adminAccessToken");

  if (!accessToken) {
    return null;
  }

  const allDoctors = await getAllDoctorAdminService(accessToken.value);

  return allDoctors;
}
