import jwt from 'jsonwebtoken';
import yenv from 'yenv';

import { PayloadCal } from '../intefaces';

const env = yenv();


export const generarJWT = (uid: string, name: string) => {
    return new Promise((resolve, reject) => {
        const payload: PayloadCal = { uid, name };
        jwt.sign(payload, env.TOKEN.KEYWORD, {
            expiresIn: env.TOKEN.TIMEOUT
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el TOKEN');
            }
            resolve(token);
        });
    });
};