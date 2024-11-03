import { z } from "zod";

// Regex for password validation (ChatGPT), I think it could be optimized
const password =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).{8,}$/;

export const signup_body = z.object({
  name: z.string().min(3),
  email: z.string().email().endsWith("@isen-ouest.yncrea.fr"),
  password: z.string().regex(password),
});

export const signin_body = z.object({
  email: z.string().email().endsWith("@isen-ouest.yncrea.fr"),
  password: z.string().regex(password),
});

export const authorization_header = z.object({
  Authorization: z.string().optional(),
});

export const id_param = z.object({
  id: z.string(),
});
