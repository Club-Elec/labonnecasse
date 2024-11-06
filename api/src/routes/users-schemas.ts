import { z } from "zod";

export const user_disabled_search_query = z.object({
  status: z.enum(["enabled", "disabled"]),
});
