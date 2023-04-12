"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputForGetTimeSlot = void 0;
const zod_1 = require("zod");
exports.inputForGetTimeSlot = zod_1.z.object({
    body: zod_1.z.object({
        hostEmail: zod_1.z.string().email(),
    }),
});
