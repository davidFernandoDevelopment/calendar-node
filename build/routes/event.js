"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.use(middlewares_1.jwtValidate);
router.get('/', controllers_1.getEvents);
router.post('/', [
    (0, express_validator_1.check)('title', 'El titulo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('start', 'Fecha de inicio es obligatorio').custom(helpers_1.isDate),
    (0, express_validator_1.check)('end', 'Fecha de finalizacion es obligatorio').custom(helpers_1.isDate),
    middlewares_1.fieldValidator
], controllers_1.createEvent);
router.put('/:id', controllers_1.updateEvent);
router.delete('/:id', controllers_1.deleteEvent);
