/** @format */

import request from 'supertest';
import app from '../src/app';

describe('Create User', () => {
    it('should create a new user', async () => {
        const newUser = {
            first_name: 'John',
            last_name: 'Doe',
            birthday_date: '1990-01-01',
            location: 'New York',
            email: 'john@example.com',
        };

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toMatchObject(newUser);
    });
});

