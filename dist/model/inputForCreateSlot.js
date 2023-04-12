"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputForCreateSlot = void 0;
const zod_1 = require("zod");
exports.inputForCreateSlot = zod_1.z.object({
    body: zod_1.z
        .object({
        year: zod_1.z.number().int().min(2023),
        month: zod_1.z.number().int().min(0).max(11),
        date: zod_1.z.number().int().min(1).max(28),
        hour: zod_1.z.number().int().min(0).max(23),
        minutes: zod_1.z.number().int().min(0).max(59),
    })
        .refine((data) => {
        const inputDate = new Date(data.year, data.month, data.date, data.hour, data.minutes);
        return inputDate > new Date(), { message: "Date must be in the future" };
    }),
});
