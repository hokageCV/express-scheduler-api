import { z } from "zod";
export const inputForGetTimeSlot = z.object({
    body: z.object({
        hostEmail: z.string().email(),
    }),
});
