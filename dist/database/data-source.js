"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../config/constants");
const citizen_entity_1 = require("../api/entity/citizen.entity");
const appeal_entity_1 = require("../api/entity/appeal.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: constants_1.DATABASE_HOST,
    port: 5432,
    username: constants_1.DATABASE_USER,
    password: constants_1.DATABASE_PASSWORD,
    database: constants_1.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [citizen_entity_1.CitizenEntity, appeal_entity_1.AppealEntity],
    subscribers: [],
    migrations: [__dirname + "/dist/database/migrations/*.js"],
});
