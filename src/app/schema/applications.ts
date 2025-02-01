import { z } from "zod";

export const createUserApplicationSchema = z.object({
  note: z.string().min(2, "Application note must be at least 2 characters."),
});

export const updateUserApplicationSchema = z.object({
  id: z.number().int().positive(),
  note: z.string().min(2, "Application note must be at least 2 characters."),
});

// Doctor

export const createDoctorApplicationSchema = z.object({
  userId: z.number().int().positive(),
  docId: z.number().int().positive(),
  note: z.string().min(2, "Application note must be at least 2 characters."),
  date: z.string().min(2, "Application date must be at least 2 characters."),
  requestByDoc: z.boolean(),
});

export const updateDoctorApplicationSchema = z.object({
  id: z.number().int().positive(),
  note: z.string().min(2, "Application note must be at least 2 characters."),
  date: z.string().min(2, "Application date must be at least 2 characters."),
  status: z
    .string()
    .min(2, "Application status must be at least 2 characters."),
  docId: z.number().int().positive(),
  requestByDoc: z.boolean(),
});
