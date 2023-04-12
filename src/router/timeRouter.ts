import { Router } from "express";
import {
  bookTimeSlot,
  createTimeSlot,
  deleteTimeSlot,
  getMyBookedSlots,
  getTimeSlots,
} from "../handlers/timeslot";
import { Validate } from "../middleware/validate";
import { inputForCreateSlot } from "../model/inputForCreateSlot";
import { inputForGetTimeSlot } from "../model/inputForGetTimeSlot";
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

const timeRouter = Router();

// ======================================

/**
 * @openapi
 * /timeslot/booked:
 *   get:
 *     tags:
 *       - TimeSlot
 *     summary: Get all time slots that the current user has booked
 *     responses:
 *       200:
 *         description: A list of time slots that the current user has booked
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       500:
 *         description: An error occurred while getting the booked time slots
 */
timeRouter.get("/timeslot/booked", getMyBookedSlots);

/**
 * @openapi
 * /timeslot:
 *  get:
 *     tags:
 *     - TimeSlot
 *     summary: Get all time slots
 *     responses:
 *       200:
 *         description: App is up and running
 */
timeRouter.get("/timeslot", Validate(inputForGetTimeSlot), getTimeSlots);

/**
 * @openapi
 * /timeslot:
 *   post:
 *     tags:
 *     - TimeSlot
 *     summary: Create a new time slot
 *     requestBody:
 *       description: The time slot to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../utils/components.yml#/CreateTimeSlotRequest'
 *     responses:
 *       201:
 *         description: The time slot was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../utils/components.yml#/CreateTimeSlotResponse'
 *       400:
 *         description: Invalid time slot data provided
 *       500:
 *         description: An error occurred while creating the time slot
 */

timeRouter.post("/timeslot", Validate(inputForCreateSlot), createTimeSlot);

/**
 * @openapi
 * /timeslot/{id}:
 *   put:
 *     tags:
 *     - TimeSlot
 *     summary: Book a time slot by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the time slot to book
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The user data for booking the time slot
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *             required:
 *               - user
 *     responses:
 *       200:
 *         description: The time slot was successfully booked
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid booking data provided
 *       404:
 *         description: The specified time slot was not found
 *       409:
 *         description: The specified time slot is already booked
 *       500:
 *         description: An error occurred while booking the time slot
 */
timeRouter.put("/timeslot", bookTimeSlot);

/**
 * @openapi
 * /timeslot/{id}:
 *   delete:
 *     tags:
 *     - TimeSlot
 *     summary: Delete a time slot by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the time slot to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The time slot was successfully deleted
 *       404:
 *         description: The specified time slot was not found
 *       500:
 *         description: An error occurred while deleting the time slot
 */

timeRouter.delete("/timeslot/:id", deleteTimeSlot);

// ======================================

export default timeRouter;
