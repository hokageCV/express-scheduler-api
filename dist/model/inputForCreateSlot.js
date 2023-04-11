import { z } from "zod";
export const inputForCreateSlot = z.object({
    body: z
        .object({
        year: z.number().int().min(2023),
        month: z.number().int().min(0).max(11),
        date: z.number().int().min(1).max(28),
        hour: z.number().int().min(0).max(23),
        minutes: z.number().int().min(0).max(59),
    })
        .refine((data) => {
        const inputDate = new Date(data.year, data.month, data.date, data.hour, data.minutes);
        return inputDate > new Date(), { message: "Date must be in the future" };
    }),
});
