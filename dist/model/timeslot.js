"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotModel = void 0;
const mongoose_1 = require("mongoose");
const TimeSlotSchema = new mongoose_1.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    isBooked: { type: Boolean, default: false },
    hostEmail: { type: String, required: true },
    nonHostEmail: { type: String, default: "" },
});
exports.TimeSlotModel = (0, mongoose_1.model)("TimeSlot", TimeSlotSchema);
