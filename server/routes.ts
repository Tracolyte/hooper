import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSignupSchema, insertPartnerInterestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/signup", async (req, res) => {
    try {
      const validatedData = insertEmailSignupSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validatedData.error.errors 
        });
      }
      
      const emailSignup = await storage.createEmailSignup(validatedData.data);
      console.log("Email signup:", emailSignup);
      
      return res.status(201).json({ 
        message: "Email signup successful",
        data: emailSignup
      });
    } catch (error) {
      console.error("Error in email signup:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/partner-interest", async (req, res) => {
    try {
      const validatedData = insertPartnerInterestSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validatedData.error.errors 
        });
      }
      
      const partnerInterest = await storage.createPartnerInterest(validatedData.data);
      console.log("Partner interest:", partnerInterest);
      
      return res.status(201).json({ 
        message: "Partner interest submission successful",
        data: partnerInterest
      });
    } catch (error) {
      console.error("Error in partner interest submission:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
