/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";
import { updateReportForApplicationSchema } from "@/app/schema/reports";

export const updateReportForApplicationService = async (
  data: z.infer<typeof updateReportForApplicationSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.doctor.reports.updateRecord, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const updateReportForApplication = await res.json();

  if (!res.ok) {
    const error = new Error(updateReportForApplication.message);
    (error as any).fieldErrors = updateReportForApplication.error;
    throw error;
  }

  return updateReportForApplication;
};
