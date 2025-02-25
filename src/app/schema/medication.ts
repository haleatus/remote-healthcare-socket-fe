import { z } from "zod";

export const addMedicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.optional(z.string()),
  dosage: z.string().min(2, "Dosage must be at least 2 characters."),
  frequency: z.string().min(2, "Frequency must be at least 2 characters."),
  expirationDate: z.string().min(2, "Expiration date is required"),
  duration: z.string().min(2, "Duration must be at least 2 characters."),
  docId: z.number().int().positive(),
  userId: z.number().int().positive(),
  recordId: z.number(),
});

export const updateMedicationSchema = z.object({
  medicationId: z.number().int().positive(),
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.optional(z.string()),
  dosage: z.string().min(2, "Dosage must be at least 2 characters."),
  frequency: z.string().min(2, "Frequency must be at least 2 characters."),
  expirationDate: z.string().min(2, "Expiration date is required"),
  duration: z.string().min(2, "Duration must be at least 2 characters."),
});
