import { Hono } from "hono";
import { database } from "../database/database";
import { categories as t_categories } from "../database/schemas";
import { zValidator } from "@hono/zod-validator";
import { settings_category } from "./settings-schema";
import { eq } from "drizzle-orm";

export const settings = new Hono()
  .get("/categories", async (c) => {
    const categories = await database.select().from(t_categories);

    return c.json(categories);
  })
  .post("/categories", zValidator("json", settings_category), async (c) => {
    const { name } = c.req.valid("json");

    await database.insert(t_categories).values({ name });

    return c.json({ message: "Created." }, 201);
  })
  .delete(
    "/categories/:name",
    zValidator("param", settings_category),
    async (c) => {
      const { name } = c.req.valid("param");

      await database.delete(t_categories).where(eq(t_categories.name, name));

      return c.json({ message: "Deleted." });
    }
  );
