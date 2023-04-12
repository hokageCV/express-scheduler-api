import { ExpressAPIHandler } from "../types";
// import { ExpressAPIHandler } from "../types.js";
import jwt from "jsonwebtoken";

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

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "somethings wrong I can feel it. heres the error:", err });
  }
};
