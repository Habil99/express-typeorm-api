import { DataSource } from "typeorm";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } from "../config/constants";
import { CitizenEntity } from "../api/entity/citizen.entity";
import { AppealEntity } from "../api/entity/appeal.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DATABASE_HOST,
    port: 5432,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: true, // true for development
    logging: true,
    entities: [CitizenEntity, AppealEntity],
    subscribers: [],
    migrations: [__dirname + "/dist/database/migrations/*.js"],
});
