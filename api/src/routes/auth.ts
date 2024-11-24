import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signin_body, signup_body } from "./schemas";
import { database } from "../database/database";
import { users } from "../database/schemas";
import { eq, sql } from "drizzle-orm";
import { sign } from "hono/jwt";

export const auth = new Hono()
  .post("/sign-up", zValidator("json", signup_body), async (c) => {
    const { name, email, password } = c.req.valid("json");

    const hash = await Bun.password.hash(password);

    const now = new Date();

    const rows = await database
      .insert(users)
      .values({ name, email, password: hash, create_at: now, updated_at: now })
      .returning({ id: users.id });

    if (rows.length === 0) {
      return c.json({ message: "Error while creating the user!" }, 500);
    }

    const { id } = rows.at(0)!;

    // Create a JWT
    const token = await sign({ id }, process.env.JWT_SECRET!);

    return c.json({ message: "OK", token });
  })
  .post("/sign-in", zValidator("json", signin_body), async (c) => {
    const { email, password } = c.req.valid("json");

    const rows = await database
      .select({
        id: users.id,
        password: users.password,
        attemps: users.attempts,
        disabled: users.disabled,
      })
      .from(users)
      .where(eq(users.email, email));

    if (rows.length === 0) {
      return c.json({ message: "Not found." }, 404);
    }

    const { id, password: hash, attemps, disabled } = rows.at(0)!;

    if (disabled || attemps >= 3) {
      return c.json({ message: "Account disabled!" }, 401);
    }

    // Verify the password
    const isValidPassword = await Bun.password.verify(password, hash);

    if (!isValidPassword) {
      // Increment the attempts
      await database
        .update(users)
        .set({ attempts: sql`${users.attempts} + 1` })
        .where(eq(users.id, id));

      return c.json({ message: "Unable to connect!" }, 401);
    }

    // Reset the attempts
    await database.update(users).set({ attempts: 0 }).where(eq(users.id, id));

    // Create a JWT
    const token = await sign({ id }, process.env.JWT_SECRET!);

    return c.json({ message: "Connected!", token });
  });
