"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const middlewares_1 = require("../middlewares");
const fieldValidator_1 = require("../middlewares/fieldValidator");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/register', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'El password debe tener 6 caracteres min').isLength({ min: 6 }),
    fieldValidator_1.fieldValidator
], auth_1.createUser);
router.post('/', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'El password debe tener 6 caracteres min').isLength({ min: 6 }),
    fieldValidator_1.fieldValidator
], auth_1.loginUser);
router.get('/renew', middlewares_1.jwtValidate, auth_1.revalidateToken);
