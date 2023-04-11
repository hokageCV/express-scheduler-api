import express from "express";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./middleware/protect.js";
import timeRouter from "./router/timeRouter.js";
import authRouter from "./router/authRouter.js";
import gcalRouter from "./router/gcalRouter.js";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.json({ message: "schedule meets effortlessly" });
});
app.use("/api", protect, timeRouter);
app.use("/auth", authRouter);
app.use("/google", gcalRouter);
export default app;
