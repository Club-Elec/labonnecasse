import { z } from "zod";

export const settings_category = z.object({
  name: z.string().min(3),
});
