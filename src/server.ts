import express, { Request, Response } from "express";
import Router from "./router";

import morgan from "morgan";
import cors from "cors";
import { createNewUser, signInUser } from "./handlers/user";
import { protect } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Validation with Zod 👊" });
});

app.use("/api", protect, Router);

app.post("/auth/signup", createNewUser);
app.post("/auth/signin", signInUser);

export default app;
