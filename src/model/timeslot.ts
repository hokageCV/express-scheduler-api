import { Schema, model } from "mongoose";

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
