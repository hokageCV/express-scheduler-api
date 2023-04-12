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
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email address of the user
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: The password of the user
 *           example: p@ssw0rd
 *         slot:
 *           type: array
 *           description: The time slots booked by the user
 *           items:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the time slot
 *                 example: '2023-04-12T18:00:00.000Z'
 *               end:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the time slot
 *                 example: '2023-04-12T19:00:00.000Z'
 *           example:
 *             - start: '2023-04-12T18:00:00.000Z'
 *               end: '2023-04-12T19:00:00.000Z'
 *             - start: '2023-04-14T16:00:00.000Z'
 *               end: '2023-04-14T17:00:00.000Z'
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: p@ssw0rd
 *         slot:
 *           - start: '2023-04-12T18:00:00.000Z'
 *             end: '2023-04-12T19:00:00.000Z'
 *           - start: '2023-04-14T16:00:00.000Z'
 *             end: '2023-04-14T17:00:00.000Z'
 */

interface UserSchemaType {
  name: string;
  email: string;
  password: string;
  slot: TimeSlotSchema[];
  googleTokens?: string;
}

const UserSchema = new Schema<UserSchemaType>({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  slot: [{ type: Schema.Types.ObjectId, ref: "TimeSlot" }],
  googleTokens: { type: String, default: "" },
});

export const UserModel = model<UserSchemaType>("User", UserSchema);
