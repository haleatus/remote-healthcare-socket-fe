"use server";

import { getAllDoctorsService } from "@/app/(doctor)/(general)/doctors/_services/get-all-doctors.service";
import { cookies } from "next/headers";

export async function getAllDoctors() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return;
  }

  const allDoctors = await getAllDoctorsService(accessToken.value);

  if (!allDoctors) {
    return null;
  }

  return allDoctors;
}
