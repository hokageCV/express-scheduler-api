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
exports.getGoogleAccessToken = exports.getGoogleAuthUrl = void 0;
const user_1 = require("../model/user");
// import type { ExpressAPIHandler } from "../types.js";
const googleAuth_1 = require("../utils/googleAuth");
const getGoogleAuthUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = googleAuth_1.oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: ["https://www.googleapis.com/auth/calendar"],
            state: "test",
        });
        return res.redirect(url);
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.getGoogleAuthUrl = getGoogleAuthUrl;
const getGoogleAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        // ====
        const bearer = req.headers.authorization;
        if (!bearer) {
            return res.status(401).json({ message: "bearer token not found" });
        }
        const [, token] = bearer.split(" ");
        if (!token) {
            return res.status(401).json({ message: "not the required token" });
        }
        // ====
        const something = yield (0, googleAuth_1.getTokens)(token);
        return res.status(200).json({ message: "done!" });
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.getGoogleAccessToken = getGoogleAccessToken;
