/** @format */

import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import UserRoutes from './routes/UserRoutes';
import cron from 'node-cron';
import { UserController } from './controllers/UserController';

const app = express();

app.use(bodyParser.json());
app.use('/users', UserRoutes);

// Schedule the birthday message sender
cron.schedule('0 9 * * *', () => {
    console.log('Sending birthday messages...');
    const userController = new UserController();
    userController.sendBirthdayMessages();
});

export default app;

