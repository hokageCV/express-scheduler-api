"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = exports.createNewUser = void 0;
const user_1 = require("../model/user");
const auth_1 = require("../utils/auth");
// import type { ExpressAPIHandler } from "../types.js";
// import { UserModel } from "../model/user.js";
// import { hashPassword, createJWT, comparePasswords } from "../utils/auth.js";
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield (0, auth_1.hashPassword)(password);
        const user = yield user_1.UserModel.create({ name, email, password: hashedPassword });
        const token = (0, auth_1.createJWT)(user.id, user.email);
        res.json({ data: { email, token } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createNewUser = createNewUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = yield (0, auth_1.comparePasswords)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = (0, auth_1.createJWT)(user.id, user.email);
        return res.json({ data: { email, token } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.signInUser = signInUser;
