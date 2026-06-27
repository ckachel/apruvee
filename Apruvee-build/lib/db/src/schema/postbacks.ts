import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const postbacksTable = pgTable("postbacks", {
  id: serial("id").primaryKey(),
  partner: text("partner").notNull(),
  clickId: text("click_id").notNull(),
  trafficSource: text("traffic_source"),
  commission: numeric("commission", { precision: 10, scale: 2 }),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPostbackSchema = createInsertSchema(postbacksTable).omit({ id: true, receivedAt: true });
export type InsertPostback = z.infer<typeof insertPostbackSchema>;
export type Postback = typeof postbacksTable.$inferSelect;
