import 'reflect-metadata'
import { DataSource } from "typeorm"
import Appointment from '../models/Appointment'
import User from '../models/User'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "barber",
    //entities: ["./src/models/*.js"],
    //synchronize: true,
    entities: [Appointment, User],
    // subscribers: [],
    migrations: [
      './src/database/migrations/*.ts'
    ],
})
