import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { database } from "../database/database";
import {
  categories as t_categories,
  sale_schema_specifications as t_sale_schema_specifications,
  specifications as t_specifications,
  specifications_values as t_specifications_values,
} from "../database/schemas";
import {
  settings_create_category,
  settings_create_specification,
  settings_get_category,
  settings_get_specification,
} from "./settings-schema";

export const settings = new Hono()
  .get("/categories", async (c) => {
    const categories = await database.select().from(t_categories);

    return c.json(categories);
  })
  .get(
    "/categories/:name",
    zValidator("param", settings_get_category),
    async (c) => {
      const { name } = c.req.valid("param");

      // Retrieve the specifications for the category
      const specifications = await database
        .select()
        .from(t_sale_schema_specifications)
        .where(eq(t_sale_schema_specifications.category, name));

      // Group the specifications by the category
      return c.json({
        name,
        specifications: specifications.map((spec) => spec.specification),
      });
    }
  )
  .post(
    "/categories",
    zValidator("json", settings_create_category),
    async (c) => {
      const { name, specifications } = c.req.valid("json");

      await database.insert(t_categories).values({ name });

      if (specifications.length > 0) {
        await database.insert(t_sale_schema_specifications).values(
          specifications.map((spec) => ({
            category: name,
            specification: spec,
          }))
        );
      }

      return c.json({ message: "Created." }, 201);
    }
  )
  .delete(
    "/categories/:name",
    zValidator("param", settings_get_category),
    async (c) => {
      const { name } = c.req.valid("param");

      await database
        .delete(t_sale_schema_specifications)
        .where(eq(t_sale_schema_specifications.category, name));

      await database.delete(t_categories).where(eq(t_categories.name, name));

      return c.json({ message: "Deleted." });
    }
  )
  .get("/specifications", async (c) => {
    // Retrieve the specifications and their values
    const specifications = await database
      .select()
      .from(t_specifications_values);

    // Group the values by the specification
    const grouped = specifications.reduce((acc, { specification, value }) => {
      if (!specification) {
        return acc;
      }

      if (!acc[specification]) {
        acc[specification] = [];
      }

      acc[specification].push(value);

      return acc;
    }, {} as Record<string, string[]>);

    return c.json(grouped);
  })
  .post(
    "/specifications",
    zValidator("json", settings_create_specification),
    async (c) => {
      const { name, values } = c.req.valid("json");

      await database.insert(t_specifications).values({ name });

      // Insert the values if they are present
      if (values) {
        await database
          .insert(t_specifications_values)
          .values(values.map((value) => ({ specification: name, value })));
      }

      return c.json({ message: "Created." }, 201);
    }
  )
  .delete(
    "/specifications/:name",
    zValidator("param", settings_get_specification),
    async (c) => {
      const { name } = c.req.valid("param");

      await database
        .delete(t_sale_schema_specifications)
        .where(eq(t_sale_schema_specifications.specification, name));

      // Delete the specification values
      await database
        .delete(t_specifications_values)
        .where(eq(t_specifications_values.specification, name));

      // Delete the specification
      await database
        .delete(t_specifications)
        .where(eq(t_specifications.name, name));

      return c.json({ message: "Deleted." });
    }
  );
