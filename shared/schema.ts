import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  fullName: text("Full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  experience: text("experience").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
});

export const faqItems = pgTable("faq_items", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"),
  order: integer("order").default(0),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Базовая схема вставки из Drizzle + omit полей, которые генерятся автоматически
export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

// Вот наша расширенная валидация формы, поверх базовой схемы
export const formApplicationSchema = insertApplicationSchema.extend({
  fullName: insertApplicationSchema.shape.fullName.min(2, "Full name must be at least 2 characters"),
  email: insertApplicationSchema.shape.email.email("Invalid email address"),
  phone: insertApplicationSchema.shape.phone.min(10, "Phone number must be valid"), // можно добавить .regex(...) для точного формата
  consent: z.boolean().refine(val => val === true, "Consent is required"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertFaqSchema = createInsertSchema(faqItems).omit({
  id: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type FormApplication = z.infer<typeof formApplicationSchema>; // Тип для формы с валидацией

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type FaqItem = typeof faqItems.$inferSelect;
export type InsertFaqItem = z.infer<typeof insertFaqSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
