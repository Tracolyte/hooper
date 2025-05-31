import { insertPartnerInterestSchema } from '../shared/schema.js';

// Simple in-memory storage for demo - replace with database in production
let partnerInterests = [];
let currentId = 1;

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = insertPartnerInterestSchema.safeParse(req.body);
    
    if (!validatedData.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validatedData.error.errors
      });
    }
    
    // Create partner interest entry
    const partnerInterest = {
      ...validatedData.data,
      id: currentId++,
      createdAt: new Date().toISOString()
    };
    
    partnerInterests.push(partnerInterest);
    
    console.log("Partner interest:", partnerInterest);
    
    return res.status(201).json({
      message: "Partner interest submission successful",
      data: partnerInterest
    });
  } catch (error) {
    console.error("Error in partner interest submission:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
} 