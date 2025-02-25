import { z } from "zod";

export const createReportForApplicationSchema = z.object({
  userId: z.number().int().positive(),
  docId: z.number().int().positive(),
  title: z.string().min(2, "Title must be at least 2 characters."),
  problem: z.string().min(2, "Problem must be at least 2 characters."),
  solution: z.string().min(2, "Solution must be at least 2 characters."),
  appointmentId: z.number().int().positive(), //applicationID
});

export const updateReportForApplicationSchema = z.object({
  id: z.number().int().positive(), // reportID
  docId: z.number().int().positive(),
  title: z.string().min(2, "Title must be at least 2 characters."),
  problem: z.string().min(2, "Problem must be at least 2 characters."),
  solution: z.string().min(2, "Solution must be at least 2 characters."),
  status: z.string().min(2, "Status must be at least 2 characters."),
});
