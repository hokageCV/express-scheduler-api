"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
// import { ExpressAPIHandler } from "../types.js";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ message: "not authorized" });
    }
    const [, token] = bearer.split(" ");
    if (!token) {
        return res.status(401).json({ message: "not valid token" });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_STRING);
        req.user = user;
        next();
    }
    catch (err) {
        return res
            .status(401)
            .json({ message: "somethings wrong I can feel it. heres the error:", err });
    }
};
exports.protect = protect;
