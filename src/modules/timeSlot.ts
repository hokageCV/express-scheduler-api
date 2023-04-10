import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

export const TimeSlotSchema = z.object({
  body: z.object({
    startTime: z
      .string()
      .refine((data) => !isNaN(new Date(data).getTime()), "Not a valid date")
      .refine(
        (data) => new Date(data) > new Date(),
        "Start time must be greater than current time"
      ),
  }),
});

export const ValidateTimeSlot =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export type TimeSlot = z.infer<typeof TimeSlotSchema>;
