import { Schema, model } from "mongoose";
import { TimeSlotSchema } from "./timeslot";

interface UserSchemaType {
  name: string;
  email: string;
  password: string;
  slot: TimeSlotSchema[];
}

const UserSchema = new Schema<UserSchemaType>({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  slot: [{ type: Schema.Types.ObjectId, ref: "TimeSlot" }],
});

export const UserModel = model<UserSchemaType>("User", UserSchema);
