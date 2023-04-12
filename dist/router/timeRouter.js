"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timeslot_1 = require("../handlers/timeslot");
const validate_1 = require("../middleware/validate");
const inputForCreateSlot_1 = require("../model/inputForCreateSlot");
const inputForGetTimeSlot_1 = require("../model/inputForGetTimeSlot");
// import {
//   bookTimeSlot,
//   createTimeSlot,
//   deleteTimeSlot,
//   getMyBookedSlots,
//   getTimeSlots,
// } from "../handlers/timeslot.js";
// import { Validate } from "../middleware/validate.js";
// import { inputForCreateSlot } from "../model/inputForCreateSlot.js";
// import { inputForGetTimeSlot } from "../model/inputForGetTimeSlot.js";
const timeRouter = (0, express_1.Router)();
// ======================================
/**
 * @openapi
 * /timeslot/booked:
 *   get:
 *     tags:
 *     - TimeSlot
 *     summary: Get booked slots
 *     description: Get all the booked time slots for the current user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     booked slots:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           start:
 *                             type: string
 *                             format: date-time
 *                           end:
 *                             type: string
 *                             format: date-time
 *                           hostEmail:
 *                             type: string
 *                           nonHostEmail:
 *                             type: string
 *                           isBooked:
 *                             type: boolean
 */
timeRouter.get("/timeslot/booked", timeslot_1.getMyBookedSlots);
/**
 * @openapi
 * /timeslot:
 *   get:
 *     tags:
 *     - TimeSlot
 *     summary: Get all available time slots for a given host
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hostEmail:
 *                 type: string
 *                 description: The email of the host whose available time slots are to be retrieved.
 *                 example: john@example.com
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     available slots:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The ID of the time slot.
 *                             example: 615cc9c9a4c34648cbe0f0e4
 *                           start:
 *                             type: string
 *                             format: date-time
 *                             description: The start time of the time slot.
 *                             example: 2023-05-25T09:00:00.000Z
 *                           end:
 *                             type: string
 *                             format: date-time
 *                             description: The end time of the time slot.
 *                             example: 2023-05-25T10:00:00.000Z
 *                           isBooked:
 *                             type: boolean
 *                             description: Indicates whether the time slot is booked or not.
 *                             example: false
 *                           hostEmail:
 *                             type: string
 *                             description: The email of the host who created the time slot.
 *                             example: john@example.com
 *                           nonHostEmail:
 *                             type: string
 *                             description: The email of the user who booked the time slot.
 *                             example: levi@example.com
 */
timeRouter.get("/timeslot", (0, validate_1.Validate)(inputForGetTimeSlot_1.inputForGetTimeSlot), timeslot_1.getTimeSlots);
/**
 * @openapi
 * /timeslot:
 *   post:
 *     tags:
 *     - TimeSlot
 *     summary: Create a new time slot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: integer
 *                 description: The year of the time slot
 *               month:
 *                 type: integer
 *                 description: The month of the time slot
 *               date:
 *                 type: integer
 *                 description: The date of the time slot
 *               hour:
 *                 type: integer
 *                 description: The hour of the time slot
 *               minutes:
 *                 type: integer
 *                 description: The minutes of the time slot
 *             required:
 *             - year
 *             - month
 *             - date
 *             - hour
 *             - minutes
 *     responses:
 *       200:
 *         description: Returns the newly created time slot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     slot created for:
 *                       type: object
 *                       description: The newly created time slot object
 */
timeRouter.post("/timeslot", (0, validate_1.Validate)(inputForCreateSlot_1.inputForCreateSlot), timeslot_1.createTimeSlot);
/**
 * @openapi
 * /timeslot:
 *   put:
 *     tags:
 *       - TimeSlot
 *     summary: Book a time slot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the time slot to book
 *               token:
 *                 type: string
 *                 description: Access token for Google Calendar API
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     slot booked for:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           format: uuid
 *                         hostEmail:
 *                           type: string
 *                           format: email
 *                         nonHostEmail:
 *                           type: string
 *                           format: email
 *                         isBooked:
 *                           type: boolean
 *                         start:
 *                           type: string
 *                           format: date-time
 *                         end:
 *                           type: string
 *                           format: date-time
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
timeRouter.put("/timeslot", timeslot_1.bookTimeSlot);
/**
 * @openapi
 * /timeslot/{id}:
 *   delete:
 *     tags:
 *       - TimeSlot
 *     summary: Delete a time slot
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the time slot to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     slot deleted:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           format: uuid
 *                         hostEmail:
 *                           type: string
 *                           format: email
 *                         isBooked:
 *                           type: boolean
 *                         start:
 *                           type: string
 *                           format: date-time
 *                         end:
 *                           type: string
 *                           format: date-time
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
timeRouter.delete("/timeslot/:id", timeslot_1.deleteTimeSlot);
// ======================================
exports.default = timeRouter;
