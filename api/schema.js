// api/schema.js - Serverless function compatible schema
const { z } = require('zod');

const insertEmailSignupSchema = z.object({
  email: z.string().email(),
  isPlayer: z.boolean().default(false),
  isPartner: z.boolean().default(false),
});

const insertPartnerInterestSchema = z.object({
  facilityName: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  message: z.string().optional(),
});

module.exports = {
  insertEmailSignupSchema,
  insertPartnerInterestSchema,
};