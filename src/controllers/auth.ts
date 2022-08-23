import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import UserModel from '../models/User';
import { User } from '../intefaces/auth';
import { generarJWT } from '../helpers/jwt';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as User;
        let existsUser = await UserModel.findOne({ email });

        if (existsUser) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese correo"
            });
        }

        const user = new UserModel(req.body);
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generarJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body as User;
        let user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese correo"
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        const token = await generarJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {

    }
};

export const revalidateToken = async (req: Request, res: Response) => {
    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    res.status(200).json({
        ok: true,
        token
    });
};
