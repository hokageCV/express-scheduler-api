import express, { Request, Response } from "express";
import timeRouter from "./router/timeRouter";

import morgan from "morgan";
import cors from "cors";
import { protect } from "./middleware/protect";

import authRouter from "./router/authRouter";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "schedule meets effortlessly" });
});

app.use("/api", protect, timeRouter);
app.use("/auth", authRouter);

export default app;
