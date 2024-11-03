import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authorization_header, id_param } from "./schemas";
import { verify } from "hono/jwt";

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
  );
