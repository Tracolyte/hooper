import { users, type User, type InsertUser, type EmailSignup, type InsertEmailSignup, type PartnerInterest, type InsertPartnerInterest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSignup(signup: InsertEmailSignup): Promise<EmailSignup>;
  createPartnerInterest(interest: InsertPartnerInterest): Promise<PartnerInterest>;
  getEmailSignups(): Promise<EmailSignup[]>;
  getPartnerInterests(): Promise<PartnerInterest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private emailSignups: Map<number, EmailSignup>;
  private partnerInterests: Map<number, PartnerInterest>;
  private currentUserId: number;
  private currentEmailSignupId: number;
  private currentPartnerInterestId: number;

  constructor() {
    this.users = new Map();
    this.emailSignups = new Map();
    this.partnerInterests = new Map();
    this.currentUserId = 1;
    this.currentEmailSignupId = 1;
    this.currentPartnerInterestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmailSignup(signup: InsertEmailSignup): Promise<EmailSignup> {
    const id = this.currentEmailSignupId++;
    const createdAt = new Date().toISOString();
    const emailSignup: EmailSignup = { ...signup, id, createdAt };
    this.emailSignups.set(id, emailSignup);
    return emailSignup;
  }

  async createPartnerInterest(interest: InsertPartnerInterest): Promise<PartnerInterest> {
    const id = this.currentPartnerInterestId++;
    const createdAt = new Date().toISOString();
    const partnerInterest: PartnerInterest = { ...interest, id, createdAt };
    this.partnerInterests.set(id, partnerInterest);
    return partnerInterest;
  }

  async getEmailSignups(): Promise<EmailSignup[]> {
    return Array.from(this.emailSignups.values());
  }

  async getPartnerInterests(): Promise<PartnerInterest[]> {
    return Array.from(this.partnerInterests.values());
  }
}

export const storage = new MemStorage();
