import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authorization_header, id_param } from "./schemas";
import { verify } from "hono/jwt";
import { create_sale_form, get_sale_params } from "./sales-schema";
import { database } from "../database/database";
import {
  categories as t_categories,
  sales as t_sales,
  sales_specifications as t_sales_specifications,
} from "../database/schemas";
import { eq } from "drizzle-orm";

export const sales = new Hono()
  .get("/", async (c) => {
    return c.json([]);
  })
  .get(
    "/:id",
    zValidator("header", authorization_header),
    zValidator("param", id_param),
    async (c) => {
      const { id } = c.req.valid("param");
      const headers = c.req.valid("header");

      const isAuthenticated = await verify(
        headers.Authorization ?? "",
        process.env.JWT_SECRET!
      );

      console.log(id, isAuthenticated);

      return c.json({});
    }
  )
  .post("/", zValidator("form", create_sale_form), async (c) => {
    const sale = c.req.valid("form");

    // Validate the price
    const price = parseFloat(sale.price);
    if (isNaN(price) || price <= 0) {
      return c.json({ error: "Invalid price" }, 400);
    }

    // Validate the category
    const categories = await database.select().from(t_categories);
    if (!categories.find((category) => category.name === sale.category)) {
      return c.json({ error: "Invalid category" }, 400);
    }

    // Validate the specifications
    const specifications = JSON.parse(sale.specifications);
    if (typeof specifications !== "object") {
      return c.json({ error: "Invalid specifications" }, 400);
    }

    const now = new Date();

    // Create the sale
    const [{ id }] = await database
      .insert(t_sales)
      .values({
        name: sale.title,
        description: sale.description,
        price: price,
        category: sale.category,
        create_at: now,
        updated_at: now,
      })
      .returning({ id: t_sales.id });

    // Create the sale specifications
    for (const [specification, value] of Object.entries(specifications)) {
      await database.insert(t_sales_specifications).values({
        sale: id,
        specification,
        value: value as string,
      });
    }

    return c.json({ message: "Created!" }, 201);
  })
  .delete("/:id", zValidator("param", get_sale_params), async (c) => {
    const { id } = c.req.valid("param");

    // Delete the sale
    await database.delete(t_sales).where(eq(t_sales.id, Number(id)));

    // Delete the sale specifications
    await database
      .delete(t_sales_specifications)
      .where(eq(t_sales_specifications.sale, Number(id)));

    return c.json({ message: "Deleted!" });
  });
