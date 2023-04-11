import { z } from "zod";

export const inputForAuth = z.object({
  body: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
});
