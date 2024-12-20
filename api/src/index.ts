import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { database } from "./database/database";

import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import { auth } from "./routes/auth";
import { news } from "./routes/news";
import { sales } from "./routes/sales";
import { rental } from "./routes/rental";
import { users } from "./routes/users";
import { analytics } from "./routes/analytics";
import { settings } from "./routes/settings";

// Database
migrate(database, { migrationsFolder: "./drizzle" });

// Create the app
const app = new Hono()
  .use("*", logger())
  .use(cors({ origin: "*" }))
  .get("/", async (c) => c.text("OK"))
  .route("/auth", auth)
  .route("/users", users)
  .route("/news", news)
  .route("/sales", sales)
  .route("/rental", rental)
  .route("/settings", settings)
  .route("/analytics", analytics);

// Export / start the app
export default {
  port: 5000,
  fetch: app.fetch,
};

export type AppType = typeof app;
