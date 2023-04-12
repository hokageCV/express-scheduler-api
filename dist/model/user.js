"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    slot: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "TimeSlot" }],
    googleTokens: { type: String, default: "" },
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
