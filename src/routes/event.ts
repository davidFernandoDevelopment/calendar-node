import { Router } from 'express';
import { check } from 'express-validator';

import { isDate } from '../helpers';
import { fieldValidator, jwtValidate } from '../middlewares';
import { createEvent, deleteEvent, updateEvent,getEvents } from '../controllers';


const router = Router();

router.use(jwtValidate);

router.get(
    '/',
    getEvents
);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
        fieldValidator
    ],
    createEvent
);

router.put(
    '/:id',
    updateEvent
);

router.delete(
    '/:id',
    deleteEvent
);

export { router };