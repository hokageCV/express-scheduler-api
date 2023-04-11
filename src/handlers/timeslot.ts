import type { ExpressAPIHandler } from "../types";
import { TimeSlotModel } from "../model/timeslot";
// import type { ExpressAPIHandler } from "../types.js";
// import { TimeSlotModel } from "../model/timeslot.js";

export const createTimeSlot: ExpressAPIHandler = async (req, res) => {
  const { year, month, date, hour, minutes } = req.body;
  const hostEmail = req.body.user.email;
  const start = new Date(year, month, date, hour, minutes);
  const end = new Date(year, month, date, hour + 1, minutes);

  try {
    const timeslot = await TimeSlotModel.create({ start, end, hostEmail });

    return res.json({ data: { "slot created for: ": timeslot } });
  } catch (err) {
    console.log(err);
  }
};

export const getTimeSlots: ExpressAPIHandler = async (req, res) => {
  const { hostEmail } = req.body;

  try {
    const timeslots = await TimeSlotModel.find({ hostEmail });

    return res.json({ data: { "available slots: ": timeslots } });
  } catch (err) {
    console.log(err);
  }
};

export const bookTimeSlot: ExpressAPIHandler = async (req, res) => {
  const { id } = req.params;
  const nonHostEmail = req.body.user.email;

  try {
    const slotExits = await TimeSlotModel.findById({ _id: id });
    if (!slotExits) {
      return res.status(404).json({ error: "slot does not exist" });
    }

    if (slotExits.isBooked) {
      return res.status(400).json({ error: "slot is already booked" });
    }

    const timeslot = await TimeSlotModel.findByIdAndUpdate(id, {
      nonHostEmail,
      isBooked: true,
    });

    return res.json({ data: { "slot booked for: ": timeslot } });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTimeSlot: ExpressAPIHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const slotExits = await TimeSlotModel.findById({ _id: id });
    if (!slotExits) {
      return res.status(404).json({ error: "slot does not exist" });
    }

    if (slotExits.hostEmail !== req.body.user.email) {
      return res.status(401).json({ error: "you are not the host" });
    }

    if (slotExits.isBooked) {
      return res.status(400).json({ error: "slot is booked, can't be deleted" });
    }

    const timeslot = await TimeSlotModel.findByIdAndDelete(id);

    return res.json({ data: { "slot deleted: ": timeslot } });
  } catch (err) {
    console.log(err);
  }
};

export const getMyBookedSlots: ExpressAPIHandler = async (req, res) => {
  const myEmail = req.body.user.email;

  try {
    const bookedSlots = await TimeSlotModel.find({
      $and: [{ isBooked: true }, { $or: [{ hostEmail: myEmail }, { nonHostEmail: myEmail }] }],
    });

    return res.json({ data: { "booked slots: ": bookedSlots } });
  } catch (err) {
    console.log(err);
  }
};
