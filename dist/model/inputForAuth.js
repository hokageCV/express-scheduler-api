"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputForAuth = void 0;
const zod_1 = require("zod");
exports.inputForAuth = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }),
    }),
});
