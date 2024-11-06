import { Hono } from "hono";
import { database } from "../database/database";
import { users as t_users } from "../database/schemas";
import { zValidator } from "@hono/zod-validator";
import { id_param } from "./schemas";
import { user_disabled_search_query } from "./users-schemas";
import { eq } from "drizzle-orm";

export const users = new Hono()
  .get("/", async (c) => {
    const users = await database
      .select({
        id: t_users.id,
        name: t_users.name,
        email: t_users.email,
        disabled: t_users.disabled,
      })
      .from(t_users);

    return c.json(users);
  })
  .patch(
    "/:id",
    zValidator("param", id_param),
    zValidator("query", user_disabled_search_query),
    async (c) => {
      const { id } = c.req.valid("param");
      const { status } = c.req.valid("query");

      await database
        .update(t_users)
        .set({ disabled: status === "enabled" ? false : true })
        .where(eq(t_users.id, Number(id)));

      return c.json({ success: true });
    }
  );
