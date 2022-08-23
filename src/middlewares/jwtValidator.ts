import yenv from 'yenv';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { PayloadCal } from '../intefaces';

const env = yenv();

export const jwtValidate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    try {
        const payload = jwt.verify(
            token,
            env.TOKEN.KEYWORD
        ) as unknown as PayloadCal;

        req.uid = payload.uid;
        req.name = payload.name;
        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};