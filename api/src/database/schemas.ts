import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Represents an user in the database
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),

  // The password is hashed
  password: text("password").notNull(),
  attempts: integer("attempts").default(0).notNull(),

  create_at: integer({ mode: "timestamp_ms" }).notNull(),
  updated_at: integer({ mode: "timestamp_ms" }).notNull(),

  // The user can be disabled
  disabled: integer({ mode: "boolean" }).default(false),
});

// Represents a sale
export const sales = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").default(0).notNull(),

  // a sale must have a category
  category: text("category")
    .notNull()
    .references(() => categories.name),

  create_at: integer({ mode: "timestamp_ms" }).notNull(),
  updated_at: integer({ mode: "timestamp_ms" }).notNull(),
});

export const sales_images = sqliteTable("sales_images", {
  sale: integer("sale").references(() => sales.id),
  url: text("url").notNull(),
});

/**
 * Represents the categories
 * A categorie can have many specifications associated to.
 */
export const categories = sqliteTable("categories", {
  name: text("name").unique().notNull(),
});

// Represents the sales specifications keys
export const specifications = sqliteTable("specifications", {
  name: text("name").unique().notNull(),
});

// Represents the values of the specifications,
export const specifications_values = sqliteTable("specifications_values", {
  // The specification
  specification: text("specification").references(() => specifications.name),
  // A value
  value: text("value").notNull(),
});

// Represents the sales specifications
export const sales_specifications = sqliteTable("sales_specifications", {
  // The sale
  sale: integer("sale").references(() => sales.id),
  // The specification
  specification: text("specification").references(() => specifications.name),
  // The value associated with the specification
  value: text("value").notNull(),
});

// Represents the sale schema specifications
export const sale_schema_specifications = sqliteTable(
  "sale_schema_specifications",
  {
    category: text("name").references(() => categories.name),
    specification: text("specification").references(() => specifications.name),
  }
);
