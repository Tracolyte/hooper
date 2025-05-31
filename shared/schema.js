import { z } from "zod";

// Validation schemas for serverless functions
export const insertEmailSignupSchema = z.object({
  email: z.string().email(),
  isPlayer: z.boolean().default(false),
  isPartner: z.boolean().default(false),
});

export const insertPartnerInterestSchema = z.object({
  facilityName: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  message: z.string().optional(),
}); 