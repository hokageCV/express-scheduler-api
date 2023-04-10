import { Router } from "express";
import { TimeSlotSchema, ValidateTimeSlot } from "./middleware/timeSlot";
import {
  bookTimeSlot,
  createTimeSlot,
  deleteTimeSlot,
  getMyBookedSlots,
  getTimeSlots,
} from "./handlers/timeslot";

const router = Router();

// ======================================

router.get("/timeslot/booked", getMyBookedSlots);

router.get("/timeslot", getTimeSlots);
router.post("/timeslot", createTimeSlot);

router.put("/timeslot/:id", bookTimeSlot);
router.delete("/timeslot/:id", deleteTimeSlot);

// ======================================

export default router;
