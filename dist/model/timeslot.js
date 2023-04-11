import { Schema, model } from "mongoose";
const TimeSlotSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    isBooked: { type: Boolean, default: false },
    hostEmail: { type: String, required: true },
    nonHostEmail: { type: String, default: "" },
});
export const TimeSlotModel = model("TimeSlot", TimeSlotSchema);
