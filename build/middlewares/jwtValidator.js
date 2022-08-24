"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtValidate = void 0;
const yenv_1 = __importDefault(require("yenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env = yenv_1.default();
const jwtValidate = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, env.TOKEN.KEYWORD);
        req.uid = payload.uid;
        req.name = payload.name;
        next();
    }
    catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};
exports.jwtValidate = jwtValidate;
