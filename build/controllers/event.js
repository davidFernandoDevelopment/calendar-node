"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEvent = exports.deleteEvent = exports.createEvent = exports.getEvents = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const getEvents = async (req, res) => {
    const evts = await Event_1.default
        .find({})
        .populate('user', 'name');
    res.status(200).json({
        ok: true,
        eventos: evts
    });
};
exports.getEvents = getEvents;
const createEvent = async (req, res) => {
    const evt = new Event_1.default(req.body);
    try {
        evt.user = req.uid;
        const eventoDB = await evt.save();
        return res.status(200).json({
            ok: true,
            evento: eventoDB
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};
exports.createEvent = createEvent;
const deleteEvent = async (req, res) => {
    const { uid, params: { id } } = req;
    try {
        const evt = await Event_1.default.findById(id);
        if (!evt)
            return res.status(404).json({ ok: false, msg: 'No existe el evento' });
        if (evt.user.toString() !== uid)
            return res.status(401).json({ ok: false, msg: 'No puedes eliminar el evento de otra persona' });
        const evtDeleted = await Event_1.default.findByIdAndDelete(id, { new: true });
        res.status(200).json({
            ok: true,
            evento: evtDeleted
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};
exports.deleteEvent = deleteEvent;
const updateEvent = async (req, res) => {
    const { uid, params: { id } } = req;
    try {
        const evt = await Event_1.default.findById(id);
        if (!evt)
            return res.status(404).json({ ok: false, msg: 'No existe el evento' });
        if (evt.user.toString() !== uid)
            return res.status(401).json({ ok: false, msg: 'No puedes editar el evento de otra persona' });
        const newEvt = {
            ...req.body,
            user: uid
        };
        const evtUpdated = await Event_1.default.findByIdAndUpdate(id, newEvt, { new: true });
        res.status(200).json({
            ok: true,
            evento: evtUpdated
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};
exports.updateEvent = updateEvent;
