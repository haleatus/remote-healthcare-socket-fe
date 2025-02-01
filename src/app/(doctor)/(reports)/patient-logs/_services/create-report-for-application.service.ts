/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { endpoints } from "@/core/contants/endpoints";

import { z } from "zod";
import { createReportForApplicationSchema } from "@/app/schema/reports";

export const createReportForApplicationService = async (
  data: z.infer<typeof createReportForApplicationSchema>,
  accessToken: string
) => {
  const res = await fetch(endpoints.doctor.reports.createRecord, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const newReportForApplication = await res.json();

  if (!res.ok) {
    const error = new Error(newReportForApplication.message);
    (error as any).fieldErrors = newReportForApplication.error;
    throw error;
  }

  return newReportForApplication;
};
