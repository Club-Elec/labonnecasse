import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  create_at: integer({ mode: "timestamp_ms" }).notNull(),
  updated_at: integer({ mode: "timestamp_ms" }).notNull(),
  disabled: integer({ mode: "boolean" }).default(false),
});
