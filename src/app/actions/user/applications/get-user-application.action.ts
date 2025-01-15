"use server";

import { getUserApplicationService } from "@/app/services/user/applications/get-user-application.service";

export async function getUserApplications({
  accessToken,
}: {
  accessToken: string;
}) {
  const userApplications = await getUserApplicationService(accessToken);

  if (!userApplications) {
    return null;
  }

  return userApplications;
}
