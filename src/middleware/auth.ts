import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ExpressAPIHandler } from "../types";

export const comparePasswords = async (password: string, hashedPassword: string) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const createJWT = (id: string, email: string) => {
  const token = jwt.sign({ id, email }, process.env.SECRET_STRING!);
  return token;
};

export const protect: ExpressAPIHandler = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: "not authorized" });
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    return res.status(401).json({ message: "not valid token" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_STRING!);
    req.body.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "somethings wrong I can feel it" });
  }
};
