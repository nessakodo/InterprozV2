import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Enums
export const userRoleEnum = pgEnum("user_role", ["admin", "client", "interpreter"]);
export const jobStatusEnum = pgEnum("job_status", ["pending", "confirmed", "in_progress", "completed", "cancelled"]);
export const jobModalityEnum = pgEnum("job_modality", ["on_site", "phone", "video"]);
export const documentStatusEnum = pgEnum("document_status", ["uploaded", "ai_translated", "human_edited", "completed"]);

// Users table (required for Replit Auth)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  role: userRoleEnum("role").notNull().default("client"),
  profileImageUrl: varchar("profile_image_url"),
  phone: varchar("phone", { length: 20 }),
  
  // Interpreter-specific fields
  languages: text("languages").array(),
  specialties: text("specialties").array(),
  certifications: jsonb("certifications"),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  isVerified: boolean("is_verified").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  totalJobs: integer("total_jobs").default(0),
  
  // Business fields
  commissionRate: decimal("commission_rate", { precision: 5, scale: 4 }).default("0.20"),
  payoutMethod: varchar("payout_method", { length: 50 }).default("bank_transfer"),
  taxId: varchar("tax_id", { length: 50 }),
  
  // Client preferences
  preferredLanguages: text("preferred_languages").array(),
  billingAddress: jsonb("billing_address"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Specialties table
export const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  clientId: varchar("client_id").notNull(),
  interpreterId: varchar("interpreter_id"),
  status: jobStatusEnum("status").notNull().default("pending"),
  language: varchar("language", { length: 50 }).notNull(),
  specialty: varchar("specialty", { length: 100 }),
  modality: jobModalityEnum("modality").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  estimatedDuration: integer("estimated_duration"), // in minutes
  location: text("location"),
  notes: text("notes"),
  rate: decimal("rate", { precision: 10, scale: 2 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  senderId: varchar("sender_id").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  fileName: varchar("file_name").notNull(),
  originalUrl: varchar("original_url").notNull(),
  aiTranslatedUrl: varchar("ai_translated_url"),
  humanEditedUrl: varchar("human_edited_url"),
  status: documentStatusEnum("status").notNull().default("uploaded"),
  uploadedBy: varchar("uploaded_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Availability table
export const availability = pgTable("availability", {
  id: serial("id").primaryKey(),
  interpreterId: varchar("interpreter_id").notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Sunday-Saturday)
  startTime: varchar("start_time").notNull(), // HH:MM format
  endTime: varchar("end_time").notNull(), // HH:MM format
  isAvailable: boolean("is_available").default(true),
});

// Ratings table
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  interpreterId: varchar("interpreter_id").notNull(),
  clientId: varchar("client_id").notNull(),
  clientRating: integer("client_rating"), // 1-5
  interpreterRating: integer("interpreter_rating"), // 1-5
  clientComments: text("client_comments"),
  interpreterComments: text("interpreter_comments"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Invoices table
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  clientId: varchar("client_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("pending"),
  stripeInvoiceId: varchar("stripe_invoice_id"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  clientJobs: many(jobs, { relationName: "clientJobs" }),
  interpreterJobs: many(jobs, { relationName: "interpreterJobs" }),
  messages: many(messages),
  availability: many(availability),
  clientRatings: many(ratings, { relationName: "clientRatings" }),
  interpreterRatings: many(ratings, { relationName: "interpreterRatings" }),
  invoices: many(invoices),
  documents: many(documents),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  client: one(users, {
    fields: [jobs.clientId],
    references: [users.id],
    relationName: "clientJobs",
  }),
  interpreter: one(users, {
    fields: [jobs.interpreterId],
    references: [users.id],
    relationName: "interpreterJobs",
  }),
  messages: many(messages),
  documents: many(documents),
  ratings: many(ratings),
  invoices: many(invoices),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  job: one(jobs, {
    fields: [messages.jobId],
    references: [jobs.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  job: one(jobs, {
    fields: [documents.jobId],
    references: [jobs.id],
  }),
  uploader: one(users, {
    fields: [documents.uploadedBy],
    references: [users.id],
  }),
}));

export const availabilityRelations = relations(availability, ({ one }) => ({
  interpreter: one(users, {
    fields: [availability.interpreterId],
    references: [users.id],
  }),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  job: one(jobs, {
    fields: [ratings.jobId],
    references: [jobs.id],
  }),
  interpreter: one(users, {
    fields: [ratings.interpreterId],
    references: [users.id],
    relationName: "interpreterRatings",
  }),
  client: one(users, {
    fields: [ratings.clientId],
    references: [users.id],
    relationName: "clientRatings",
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  job: one(jobs, {
    fields: [invoices.jobId],
    references: [jobs.id],
  }),
  client: one(users, {
    fields: [invoices.clientId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  timestamp: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
});

export const insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
  createdAt: true,
});

export const insertSpecialtySchema = createInsertSchema(specialties).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Rating = typeof ratings.$inferSelect;
export type InsertSpecialty = z.infer<typeof insertSpecialtySchema>;
export type Specialty = typeof specialties.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Availability = typeof availability.$inferSelect;
