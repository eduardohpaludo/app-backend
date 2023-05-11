import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: ["src/entity/*.js"],
    synchronize: true,
    logging: true,
    //entities: [Post, Category],
    subscribers: [],
    migrations: [],
})
