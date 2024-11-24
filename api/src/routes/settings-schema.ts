import { z } from "zod";

export const settings_get_category = z.object({
  name: z.string().min(3),
});

export const settings_create_category = z.object({
  name: z.string().min(3),
  specifications: z.array(z.string()).default([]),
});

export const settings_get_specification = z.object({
  name: z.string().min(3),
});

export const settings_create_specification = z.object({
  name: z.string().min(3),
  values: z.array(z.string()).default([]).optional(),
});
