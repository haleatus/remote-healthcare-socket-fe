import { z } from "zod";

export const createReportForApplicationSchema = z.object({
  userId: z.number().int().positive(),
  docId: z.number().int().positive(),
  problem: z.string().min(2, "Problem must be at least 2 characters."),
  solution: z.string().min(2, "Solution must be at least 2 characters."),
  appointmentId: z.number().int().positive(), //applicationID
});
