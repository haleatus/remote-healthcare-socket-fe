import "server-only";

import { endpoints } from "@/core/contants/endpoints";

export const deleteApplicationService = async (
  applicationId: string,
  accessToken: string
) => {
  const res = await fetch(
    endpoints.doctor.applications.deleteDoctorApplication.replace(
      ":id",
      applicationId
    ),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const deleteApplication = await res.json();

  if (!res.ok) {
    const error = new Error(deleteApplication.message);
    throw error;
  }

  return deleteApplication;
};
