import { Router } from "express";
import { Validate } from "../middleware/validate";
import { inputForAuth } from "../model/inputForAuth";
import { createNewUser, signInUser } from "../handlers/user";

const authRouter = Router();

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

authRouter.post("/signup", Validate(inputForAuth), createNewUser);

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

authRouter.post("/signin", Validate(inputForAuth), signInUser);

// ======================================

export default authRouter;
