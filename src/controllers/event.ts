import { Request, Response } from 'express';

import EventModel from '../models/Event';

export const getEvents = async (req: Request, res: Response) => {
    const evts = await EventModel
        .find({})
        .populate('user', 'name');

    res.status(200).json({
        ok: true,
        eventos: evts
    });
};

export const createEvent = async (req: Request, res: Response) => {
    const evt = new EventModel(req.body);

    try {
        evt.user = req.uid;
        const eventoDB = await evt.save();
        return res.status(200).json({
            ok: true,
            evento: eventoDB
        });
    } catch (err) {
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    const {
        uid,
        params: { id }
    } = req;
    try {
        const evt = await EventModel.findById(id);
        if (!evt)
            return res.status(404).json({ ok: false, msg: 'No existe el evento' });

        if (evt.user.toString() !== uid)
            return res.status(401).json({ ok: false, msg: 'No puedes editar el evento de otra persona' });

        const evtDeleted = await EventModel.findByIdAndRemove(id, { new: true });

        res.status(200).json({
            ok: true,
            evento: evtDeleted
        });
    } catch (err) {
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    const {
        uid,
        params: { id }
    } = req;
    try {
        const evt = await EventModel.findById(id);
        if (!evt)
            return res.status(404).json({ ok: false, msg: 'No existe el evento' });

        if (evt.user.toString() !== uid)
            return res.status(401).json({ ok: false, msg: 'No puedes editar el evento de otra persona' });

        const newEvt = {
            ...req.body,
            user: uid
        };
        const evtUpdated = await EventModel.findByIdAndUpdate(id, newEvt, { new: true });

        res.status(200).json({
            ok: true,
            evento: evtUpdated
        });
    } catch (err) {
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};
