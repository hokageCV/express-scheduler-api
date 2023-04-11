import { Schema, model } from "mongoose";

/**
 * @openapi
 * components:
 *   schemas:
 *     TimeSlot:
 *       type: object
 *       properties:
 *         start:
 *           type: string
 *           format: date-time
 *           description: The start date and time of the time slot
 *         end:
 *           type: string
 *           format: date-time
 *           description: The end date and time of the time slot
 *         isBooked:
 *           type: boolean
 *           description: Whether the time slot is booked or not
 *         hostEmail:
 *           type: string
 *           description: The email address of the host of the time slot
 *         nonHostEmail:
 *           type: string
 *           description: The email address of the non-host (if any) of the time slot
 */

export interface TimeSlotSchema {
  start: Date;
  end: Date;
  isBooked?: boolean;
  hostEmail: string;
  nonHostEmail?: string;
}

const TimeSlotSchema = new Schema<TimeSlotSchema>({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  isBooked: { type: Boolean, default: false },
  hostEmail: { type: String, required: true },
  nonHostEmail: { type: String, default: "" },
});

export const TimeSlotModel = model<TimeSlotSchema>("TimeSlot", TimeSlotSchema);
