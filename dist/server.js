"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const protect_1 = require("./middleware/protect");
const timeRouter_1 = __importDefault(require("./router/timeRouter"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const gcalRouter_1 = __importDefault(require("./router/gcalRouter"));
// import { protect } from "./middleware/protect.js";
// import timeRouter from "./router/timeRouter.js";
// import authRouter from "./router/authRouter.js";
// import gcalRouter from "./router/gcalRouter.js";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.json({ message: "schedule meets effortlessly" });
});
app.use("/api", protect_1.protect, timeRouter_1.default);
app.use("/auth", authRouter_1.default);
app.use("/google", gcalRouter_1.default);
exports.default = app;
