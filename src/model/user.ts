import { Schema, model } from "mongoose";
import { TimeSlotSchema } from "./timeslot";
// import { TimeSlotSchema } from "./timeslot.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         slot:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeSlot'
 *           description: The time slots booked by the user
 */

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
