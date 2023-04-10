import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";
import { TimeSlotSchema, ValidateTimeSlot } from "./modules/timeSlot";

import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Validation with Zod 👊" });
});

app.post("/create", ValidateTimeSlot(TimeSlotSchema), (req: Request, res: Response): Response => {
  return res.json({ ...req.body });
});

export default app;
