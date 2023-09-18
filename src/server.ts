/** @format */

import { createConnection } from 'typeorm';
import app from './app';
import { User } from './entities/User';

const port = process.env.PORT || 3000;

createConnection({
    type: 'mysql',
    host: 'your-mysql-host',
    port: 3306,
    username: 'your-mysql-username',
    password: 'your-mysql-password',
    database: 'your-mysql-database',
    entities: [User],
    synchronize: true,
})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error: any) => {
        console.error('Database connection error:', error);
    });

