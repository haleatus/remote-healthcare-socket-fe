import { z } from "zod";

export const createUserApplicationSchema = z.object({
  note: z.string().min(2, "Application note must be at least 2 characters."),
});

export const updateUserApplicationSchema = z.object({
  id: z.number().int().positive(),
  note: z.string().min(2, "Application note must be at least 2 characters."),
});
