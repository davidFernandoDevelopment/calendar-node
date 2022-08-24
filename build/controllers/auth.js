"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateToken = exports.loginUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../helpers/jwt");
const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let existsUser = await User_1.default.findOne({ email });
        if (existsUser) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese correo"
            });
        }
        const user = new User_1.default(req.body);
        const salt = bcryptjs_1.default.genSaltSync(10);
        user.password = bcryptjs_1.default.hashSync(password, salt);
        await user.save();
        const token = await jwt_1.generarJWT(user.id, user.name);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese correo"
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }
        const token = await jwt_1.generarJWT(user.id, user.name);
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    }
    catch (error) {
    }
};
exports.loginUser = loginUser;
const revalidateToken = async (req, res) => {
    const { uid, name } = req;
    const token = await jwt_1.generarJWT(uid, name);
    res.status(200).json({
        ok: true,
        token
    });
};
exports.revalidateToken = revalidateToken;
