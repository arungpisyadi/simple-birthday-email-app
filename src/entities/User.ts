/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    first_name: string | undefined;

    @Column()
    last_name: string | undefined;

    @Column()
    birthday_date: Date | undefined;

    @Column()
    location: string | undefined;

    @Column()
    email: string | undefined;
}