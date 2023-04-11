import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    slot: [{ type: Schema.Types.ObjectId, ref: "TimeSlot" }],
});
export const UserModel = model("User", UserSchema);
