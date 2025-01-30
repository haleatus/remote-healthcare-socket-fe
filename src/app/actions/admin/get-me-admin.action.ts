"use server";

import { getMeAdminService } from "@/app/services/admin/get-me-admin.service";
import { cookies } from "next/headers";

export async function getMeAdmin() {
  const cookieStore = await cookies();

  const adminAccessToken = cookieStore.get("adminAccessToken");

  if (!adminAccessToken) {
    return null;
  }

  const meAdmin = await getMeAdminService(adminAccessToken.value);

  if (!meAdmin) {
    return null;
  }

  return meAdmin;
}
