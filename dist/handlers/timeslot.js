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
exports.getMyBookedSlots = exports.deleteTimeSlot = exports.bookTimeSlot = exports.getTimeSlots = exports.createTimeSlot = void 0;
const timeslot_1 = require("../model/timeslot");
const gcal_1 = require("../utils/gcal");
const googleAuth_1 = require("../utils/googleAuth");
const createTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, month, date, hour, minutes } = req.body;
    const hostEmail = req.user.email;
    const start = new Date(year, month, date, hour, minutes);
    const end = new Date(year, month, date, hour + 1, minutes);
    try {
        const timeslot = yield timeslot_1.TimeSlotModel.create({ start, end, hostEmail });
        return res.json({ data: { "slot created for: ": timeslot } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createTimeSlot = createTimeSlot;
const getTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hostEmail } = req.body;
    try {
        const timeslots = yield timeslot_1.TimeSlotModel.find({ hostEmail });
        return res.json({ data: { "available slots: ": timeslots } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getTimeSlots = getTimeSlots;
const bookTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.body;
    const nonHostEmail = req.user.email;
    try {
        const slotExits = yield timeslot_1.TimeSlotModel.findById({ _id: id });
        if (!slotExits) {
            return res.status(404).json({ error: "slot does not exist" });
        }
        if (slotExits.isBooked) {
            return res.status(400).json({ error: "slot is already booked" });
        }
        const timeslot = yield timeslot_1.TimeSlotModel.findByIdAndUpdate(id, {
            nonHostEmail,
            isBooked: true,
        });
        // ==============================
        googleAuth_1.oAuth2Client.setCredentials({ access_token: token });
        const { start, end, hostEmail } = slotExits;
        yield (0, gcal_1.createGCalEvent)(start, end, hostEmail, nonHostEmail);
        //===============================
        return res.json({ data: { "slot booked for: ": timeslot } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.bookTimeSlot = bookTimeSlot;
const deleteTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const requesterEmail = req.user.email;
    try {
        const slotExits = yield timeslot_1.TimeSlotModel.findById({ _id: id });
        if (!slotExits) {
            return res.status(404).json({ error: "slot does not exist" });
        }
        if (slotExits.hostEmail !== requesterEmail) {
            return res.status(401).json({ error: "you are not the host" });
        }
        if (slotExits.isBooked) {
            return res.status(400).json({ error: "slot is booked, can't be deleted" });
        }
        const timeslot = yield timeslot_1.TimeSlotModel.findByIdAndDelete(id);
        return res.json({ data: { "slot deleted: ": timeslot } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteTimeSlot = deleteTimeSlot;
const getMyBookedSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myEmail = req.user.email;
    try {
        const bookedSlots = yield timeslot_1.TimeSlotModel.find({
            $and: [{ isBooked: true }, { $or: [{ hostEmail: myEmail }, { nonHostEmail: myEmail }] }],
        });
        return res.json({ data: { "booked slots: ": bookedSlots } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getMyBookedSlots = getMyBookedSlots;
