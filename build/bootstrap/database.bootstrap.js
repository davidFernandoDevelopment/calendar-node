"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const yenv_1 = __importDefault(require("yenv"));
const env = yenv_1.default();
const DBconnection = async () => {
    try {
        const connectionString = `mongodb+srv://${env.DATABASE.MONGO.USER}:${env.DATABASE.MONGO.PASSWORD}@${env.DATABASE.MONGO.HOST}/${env.DATABASE.MONGO.DB_NAME}`;
        const options = {
            maxPoolSize: 10,
        };
        await mongoose_1.default.connect(connectionString, options);
        console.log('CONNECTION SUCCESSFULL !!!');
    }
    catch (error) {
        throw new Error();
    }
};
exports.DBconnection = DBconnection;
