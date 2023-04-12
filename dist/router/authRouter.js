"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middleware/validate");
const inputForAuth_1 = require("../model/inputForAuth");
const user_1 = require("../handlers/user");
// import { Validate } from "../middleware/validate.js";
// import { inputForAuth } from "../model/inputForAuth.js";
// import { createNewUser, signInUser } from "../handlers/user.js";
const authRouter = (0, express_1.Router)();
// ======================================
/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Creates a new user
 *     requestBody:
 *       description: User object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                     token:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
authRouter.post("/signup", (0, validate_1.Validate)(inputForAuth_1.inputForAuth), user_1.createNewUser);
/**
 * @openapi
 * /auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signs in a user
 *     requestBody:
 *       description: User object that needs to be signed in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                     token:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
authRouter.post("/signin", (0, validate_1.Validate)(inputForAuth_1.inputForAuth), user_1.signInUser);
// ======================================
exports.default = authRouter;
