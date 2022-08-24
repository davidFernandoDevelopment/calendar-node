import cors from 'cors';
import yenv from 'yenv';
import path from 'path';
import express from 'express';

import { router as authRouter } from './routes/auth';
import { router as eventRouter } from './routes/event';
import { DBconnection } from './bootstrap/database.bootstrap';

const env = yenv();
const app = express();

DBconnection();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);

app.listen(env.PORT, () => {
	console.log(`SERVER IS RUNNING ON PORT: ${env.PORT}`);
});
