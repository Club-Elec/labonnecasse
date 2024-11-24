import { Hono } from "hono";
import { database } from "../database/database";
import { users as t_users } from "../database/schemas";
import { count } from "drizzle-orm";

export const analytics = new Hono().get("/", async (c) => {
  const [{ users }] = await database.select({ users: count() }).from(t_users);

  return c.json({ users });
});
