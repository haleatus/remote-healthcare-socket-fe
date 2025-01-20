"use server";

import { getAllApplicationsService } from "@/app/services/admin/applications/get-all-applications.service";

export async function getAllApplications({
  adminAccessToken,
}: {
  adminAccessToken: string;
}) {
  const applications = await getAllApplicationsService(adminAccessToken);

  if (!applications) {
    return null;
  }

  return applications;
}
