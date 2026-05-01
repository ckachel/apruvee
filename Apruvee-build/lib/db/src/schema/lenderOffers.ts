import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lenderOffersTable = pgTable("lender_offers", {
  id: serial("id").primaryKey(),
  lenderName: text("lender_name").notNull(),
  logoUrl: text("logo_url"),
  minRate: real("min_rate").notNull(),
  maxRate: real("max_rate").notNull(),
  minAmount: integer("min_amount").notNull(),
  maxAmount: integer("max_amount").notNull(),
  minTerm: integer("min_term").notNull(),
  maxTerm: integer("max_term").notNull(),
  minCreditScore: integer("min_credit_score").notNull(),
  estimatedMonthlyPayment: real("estimated_monthly_payment").notNull(),
  features: text("features").array().notNull().default([]),
  affiliateUrl: text("affiliate_url").notNull(),
  badgeLabel: text("badge_label"),
});

export const insertLenderOfferSchema = createInsertSchema(lenderOffersTable).omit({ id: true });
export type InsertLenderOffer = z.infer<typeof insertLenderOfferSchema>;
export type LenderOffer = typeof lenderOffersTable.$inferSelect;
