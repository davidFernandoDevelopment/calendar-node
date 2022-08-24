"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const moment_1 = __importDefault(require("moment"));
const isDate = (value, opts) => {
    if (!value) {
        return false;
    }
    const fecha = moment_1.default(value);
    if (fecha.isValid()) {
        return true;
    }
    else {
        return false;
    }
};
exports.isDate = isDate;
