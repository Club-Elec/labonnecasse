import { z } from "zod";

export const create_sale_form = z.object({
  title: z.string().min(3),
  description: z.string().min(3),

  // as it is sended through a form, it will be a string
  price: z.string().min(1),

  category: z.string().min(3),

  // as it is sended through a form, it will be a string
  specifications: z.string().min(2),
});

export const get_sale_params = z.object({
  id: z.string(),
});
