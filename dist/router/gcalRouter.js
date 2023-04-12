"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gcal_1 = require("../handlers/gcal");
// import { getGoogleAuthUrl, getGoogleAccessToken } from "../handlers/gcal.js";
const gcalRouter = (0, express_1.Router)();
// ======================================
gcalRouter.get("/", gcal_1.getGoogleAuthUrl);
gcalRouter.get("/redirect", gcal_1.getGoogleAccessToken);
// ======================================
exports.default = gcalRouter;
