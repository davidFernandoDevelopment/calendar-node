import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, loginUser, revalidateToken } from '../controllers/auth';
import { jwtValidate } from '../middlewares';
import { fieldValidator } from '../middlewares/fieldValidator';


const router = Router();

router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres min').isLength({ min: 6 }),
        fieldValidator
    ]
    , createUser
);
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres min').isLength({ min: 6 }),
        fieldValidator
    ]
    , loginUser
);
router.get(
    '/renew', 
    jwtValidate,
    revalidateToken
);



export { router };