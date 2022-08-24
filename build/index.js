"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const yenv_1 = __importDefault(require("yenv"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("./routes/auth");
const event_1 = require("./routes/event");
const database_bootstrap_1 = require("./bootstrap/database.bootstrap");
const env = yenv_1.default();
const app = express_1.default();
database_bootstrap_1.DBconnection();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + 'public'));
app.use('/api/auth', auth_1.router);
app.use('/api/events', event_1.router);
app.listen(env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${env.PORT}`);
});
