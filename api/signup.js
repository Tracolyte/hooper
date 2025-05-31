const { insertEmailSignupSchema } = require('./schema');

// Simple in-memory storage for demo - replace with database in production
let emailSignups = [];
let currentId = 1;

module.exports = async function handler(req, res) {
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
    const validatedData = insertEmailSignupSchema.safeParse(req.body);
    
    if (!validatedData.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validatedData.error.errors
      });
    }
    
    // Create email signup entry
    const emailSignup = {
      ...validatedData.data,
      id: currentId++,
      createdAt: new Date().toISOString()
    };
    
    emailSignups.push(emailSignup);
    
    console.log("Email signup:", emailSignup);
    
    return res.status(201).json({
      message: "Email signup successful",
      data: emailSignup
    });
  } catch (error) {
    console.error("Error in email signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};