"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const yenv_1 = __importDefault(require("yenv"));
const env = (0, yenv_1.default)();
const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jsonwebtoken_1.default.sign(payload, env.TOKEN.KEYWORD, {
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
exports.generarJWT = generarJWT;
