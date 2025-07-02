import {
  users,
  jobs,
  messages,
  documents,
  ratings,
  specialties,
  availability,
  invoices,
  type User,
  type InsertUser,
  type Job,
  type InsertJob,
  type Message,
  type InsertMessage,
  type Document,
  type InsertDocument,
  type Rating,
  type InsertRating,
  type Specialty,
  type InsertSpecialty,
  type Invoice,
  type Availability,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, desc, asc, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations for traditional auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User>;
  createTestUsers(): Promise<void>;
  
  // Job operations
  createJob(job: InsertJob): Promise<Job>;
  getJob(id: number): Promise<Job | undefined>;
  getJobsByClient(clientId: string): Promise<Job[]>;
  getJobsByInterpreter(interpreterId: string): Promise<Job[]>;
  getAvailableJobs(): Promise<Job[]>;
  updateJob(id: number, updates: Partial<InsertJob>): Promise<Job>;
  assignInterpreter(jobId: number, interpreterId: string): Promise<Job>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getJobMessages(jobId: number): Promise<Message[]>;
  
  // Document operations
  createDocument(document: InsertDocument): Promise<Document>;
  getJobDocuments(jobId: number): Promise<Document[]>;
  updateDocumentStatus(id: number, status: string, url?: string): Promise<Document>;
  
  // Rating operations
  createRating(rating: InsertRating): Promise<Rating>;
  getJobRating(jobId: number): Promise<Rating | undefined>;
  getInterpreterRatings(interpreterId: string): Promise<Rating[]>;
  
  // Specialty operations
  getSpecialties(): Promise<Specialty[]>;
  createSpecialty(specialty: InsertSpecialty): Promise<Specialty>;
  
  // Availability operations
  getInterpreterAvailability(interpreterId: string): Promise<Availability[]>;
  setAvailability(interpreterId: string, availability: any[]): Promise<void>;
  
  // Analytics
  getJobStats(): Promise<any>;
  getUserStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations for traditional auth
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async createTestUsers(): Promise<void> {
    const { scrypt, randomBytes } = await import("crypto");
    const { promisify } = await import("util");
    const scryptAsync = promisify(scrypt);

    async function hashPassword(password: string) {
      const salt = randomBytes(16).toString("hex");
      const buf = (await scryptAsync(password, salt, 64)) as Buffer;
      return `${buf.toString("hex")}.${salt}`;
    }

    try {
      // Admin user
      await this.createUser({
        id: 1,
        username: "admin",
        email: "admin@example.com",
        password: await hashPassword("admin123"),
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      });

      // Client user
      await this.createUser({
        id: 2,
        username: "client",
        email: "client@example.com",
        password: await hashPassword("client123"),
        firstName: "Test",
        lastName: "Client",
        role: "client",
      });

      // Interpreter user
      await this.createUser({
        id: 3,
        username: "interpreter",
        email: "interpreter@example.com",
        password: await hashPassword("interpreter123"),
        firstName: "Test",
        lastName: "Interpreter",
        role: "interpreter",
        languages: ["Spanish", "English"],
        specialties: ["Medical", "Legal"],
        isVerified: true,
        hourlyRate: "85.00",
      });
    } catch (error: any) {
      if (!error.message.includes("duplicate key")) {
        throw error;
      }
    }
  }

  // Job operations
  async createJob(job: InsertJob): Promise<Job> {
    const [newJob] = await db.insert(jobs).values(job).returning();
    return newJob;
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job;
  }

  async getJobsByClient(clientId: string): Promise<Job[]> {
    return await db
      .select()
      .from(jobs)
      .where(eq(jobs.clientId, clientId))
      .orderBy(desc(jobs.createdAt));
  }

  async getJobsByInterpreter(interpreterId: string): Promise<Job[]> {
    return await db
      .select()
      .from(jobs)
      .where(eq(jobs.interpreterId, interpreterId))
      .orderBy(desc(jobs.createdAt));
  }

  async getAvailableJobs(): Promise<Job[]> {
    return await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.status, "pending"), sql`${jobs.interpreterId} IS NULL`))
      .orderBy(desc(jobs.createdAt));
  }

  async updateJob(id: number, updates: Partial<InsertJob>): Promise<Job> {
    const [updatedJob] = await db
      .update(jobs)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(jobs.id, id))
      .returning();
    return updatedJob;
  }

  async assignInterpreter(jobId: number, interpreterId: string): Promise<Job> {
    const [updatedJob] = await db
      .update(jobs)
      .set({ 
        interpreterId, 
        status: "confirmed",
        updatedAt: new Date() 
      })
      .where(eq(jobs.id, jobId))
      .returning();
    return updatedJob;
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getJobMessages(jobId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.jobId, jobId))
      .orderBy(asc(messages.timestamp));
  }

  // Document operations
  async createDocument(document: InsertDocument): Promise<Document> {
    const [newDocument] = await db.insert(documents).values(document).returning();
    return newDocument;
  }

  async getJobDocuments(jobId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.jobId, jobId))
      .orderBy(desc(documents.createdAt));
  }

  async updateDocumentStatus(id: number, status: string, url?: string): Promise<Document> {
    const updates: any = { status };
    if (url) {
      if (status === "ai_translated") {
        updates.aiTranslatedUrl = url;
      } else if (status === "human_edited") {
        updates.humanEditedUrl = url;
      }
    }
    
    const [updatedDocument] = await db
      .update(documents)
      .set(updates)
      .where(eq(documents.id, id))
      .returning();
    return updatedDocument;
  }

  // Rating operations
  async createRating(rating: InsertRating): Promise<Rating> {
    const [newRating] = await db.insert(ratings).values(rating).returning();
    return newRating;
  }

  async getJobRating(jobId: number): Promise<Rating | undefined> {
    const [rating] = await db.select().from(ratings).where(eq(ratings.jobId, jobId));
    return rating;
  }

  async getInterpreterRatings(interpreterId: string): Promise<Rating[]> {
    return await db
      .select()
      .from(ratings)
      .where(eq(ratings.interpreterId, interpreterId))
      .orderBy(desc(ratings.createdAt));
  }

  // Specialty operations
  async getSpecialties(): Promise<Specialty[]> {
    return await db.select().from(specialties).orderBy(asc(specialties.name));
  }

  async createSpecialty(specialty: InsertSpecialty): Promise<Specialty> {
    const [newSpecialty] = await db.insert(specialties).values(specialty).returning();
    return newSpecialty;
  }

  // Availability operations
  async getInterpreterAvailability(interpreterId: string): Promise<Availability[]> {
    return await db
      .select()
      .from(availability)
      .where(eq(availability.interpreterId, interpreterId))
      .orderBy(asc(availability.dayOfWeek));
  }

  async setAvailability(interpreterId: string, availabilityData: any[]): Promise<void> {
    // Delete existing availability
    await db.delete(availability).where(eq(availability.interpreterId, interpreterId));
    
    // Insert new availability
    if (availabilityData.length > 0) {
      await db.insert(availability).values(availabilityData);
    }
  }

  // Analytics
  async getJobStats(): Promise<any> {
    const totalJobs = await db.select({ count: count() }).from(jobs);
    const completedJobs = await db
      .select({ count: count() })
      .from(jobs)
      .where(eq(jobs.status, "completed"));
    const pendingJobs = await db
      .select({ count: count() })
      .from(jobs)
      .where(eq(jobs.status, "pending"));

    return {
      total: totalJobs[0].count,
      completed: completedJobs[0].count,
      pending: pendingJobs[0].count,
    };
  }

  async getUserStats(): Promise<any> {
    const totalUsers = await db.select({ count: count() }).from(users);
    const clients = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.role, "client"));
    const interpreters = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.role, "interpreter"));

    return {
      total: totalUsers[0].count,
      clients: clients[0].count,
      interpreters: interpreters[0].count,
    };
  }
}

export const storage = new DatabaseStorage();
