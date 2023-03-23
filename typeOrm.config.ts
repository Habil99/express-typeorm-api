// typeOrm.config.ts
import { DataSource } from "typeorm";
import * as fs from "fs";
import path = require("path");

// read files with regex inside entity folder
const entityFiles = fs.readdirSync(path.join(__dirname, "src/api/entity")).filter((file) => {
    return file.match(/\.ts$/);
})

const migrationFiles = fs.readdirSync(path.join(__dirname, "src/database/migrations")).filter((file) => {
    return file.match(/\.ts$/);
})

const AppDataSource: DataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "habil1410",
    "database": "crm",
    "logging": true,
    "entities": entityFiles.map((file) => {
        return `src/api/entity/${file}`;
    }),
    "migrations": migrationFiles.map((file) => {
        return `src/database/migrations/${file}`;
    }),
    "logger": "advanced-console"
})

export default AppDataSource;