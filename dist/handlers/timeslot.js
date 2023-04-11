var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TimeSlotModel } from "../model/timeslot.js";
export const createTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, month, date, hour, minutes } = req.body;
    const hostEmail = req.body.user.email;
    const start = new Date(year, month, date, hour, minutes);
    const end = new Date(year, month, date, hour + 1, minutes);
    try {
        const timeslot = yield TimeSlotModel.create({ start, end, hostEmail });
        return res.json({ data: { "slot created for: ": timeslot } });
    }
    catch (err) {
        console.log(err);
    }
});
export const getTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hostEmail } = req.body;
    try {
        const timeslots = yield TimeSlotModel.find({ hostEmail });
        return res.json({ data: { "available slots: ": timeslots } });
    }
    catch (err) {
        console.log(err);
    }
});
export const bookTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const nonHostEmail = req.body.user.email;
    try {
        const slotExits = yield TimeSlotModel.findById({ _id: id });
        if (!slotExits) {
            return res.status(404).json({ error: "slot does not exist" });
        }
        if (slotExits.isBooked) {
            return res.status(400).json({ error: "slot is already booked" });
        }
        const timeslot = yield TimeSlotModel.findByIdAndUpdate(id, {
            nonHostEmail,
            isBooked: true,
        });
        return res.json({ data: { "slot booked for: ": timeslot } });
    }
    catch (err) {
        console.log(err);
    }
});
export const deleteTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const slotExits = yield TimeSlotModel.findById({ _id: id });
        if (!slotExits) {
            return res.status(404).json({ error: "slot does not exist" });
        }
        if (slotExits.hostEmail !== req.body.user.email) {
            return res.status(401).json({ error: "you are not the host" });
        }
        if (slotExits.isBooked) {
            return res.status(400).json({ error: "slot is booked, can't be deleted" });
        }
        const timeslot = yield TimeSlotModel.findByIdAndDelete(id);
        return res.json({ data: { "slot deleted: ": timeslot } });
    }
    catch (err) {
        console.log(err);
    }
});
export const getMyBookedSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myEmail = req.body.user.email;
    try {
        const bookedSlots = yield TimeSlotModel.find({
            $and: [{ isBooked: true }, { $or: [{ hostEmail: myEmail }, { nonHostEmail: myEmail }] }],
        });
        return res.json({ data: { "booked slots: ": bookedSlots } });
    }
    catch (err) {
        console.log(err);
    }
});
