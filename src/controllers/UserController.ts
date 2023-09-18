/** @format */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import axios from 'axios';

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const user = userRepository.create(req.body);
            await userRepository.save(user);

            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating user');
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const { id } = req.params;
            const user = await userRepository.findOne(id);

            if (!user) {
                return res.status(404).send('User not found');
            }

            userRepository.merge(user, req.body);
            await userRepository.save(user);

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating user');
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const { id } = req.params;
            const user = await userRepository.findOne(id);

            if (!user) {
                return res.status(404).send('User not found');
            }

            await userRepository.remove(user);

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting user');
        }
    }

    async sendBirthdayMessages() {
        // Schedule this function to run daily at 9 AM
        const userRepository = getRepository(User);
        const today = new Date();

        try {
            const users = await userRepository.find({
                where: {
                    birthday_date: today.toISOString().substr(0, 10),
                },
            });

            for (const user of users) {
                const email = user.email;
                const message =
                    'Hey, ${user.first_name} ${user.last_name}it’s your birthday!';

                // Send the email using the email service
                await axios.post(
                    'https://email-service.digitalenvision.com.au/',
                    {
                        email,
                        message,
                    }
                );
            }
        } catch (error) {
            console.error('Failed to send birthday messages:', error);
        }
    }
}





