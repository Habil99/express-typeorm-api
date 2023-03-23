"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Description: This file is the entry point of the application
const express_1 = __importDefault(require("express"));
// Import reflect-metadata to use decorators
require("reflect-metadata");
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
// Import data source to connect to database
const data_source_1 = require("./database/data-source");
// Import routes
// Import constants to use server port
const constants_1 = require("./config/constants");
const api_1 = __importDefault(require("./api"));
const BaseExceptionHandler_1 = __importDefault(require("./api/exceptions/BaseExceptionHandler"));
const helmet_1 = __importDefault(require("helmet"));
// Create express app
const app = (0, express_1.default)();
// use helmet for security
app.use((0, helmet_1.default)());
// Use json parser
app.use(express_1.default.json());
// add default endpoint api/v1  to all routes
app.use("/api/v1", api_1.default);
// add exception handler
app.use(BaseExceptionHandler_1.default.handleException);
// Start server
app.listen(3000, () => {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log(`Server listening on port ${constants_1.SERVER_PORT}, database connected`);
    }).catch((error) => {
        console.error(error, "Error while connecting to database");
    });
}).on("error", (error) => {
    console.error(error, "Error while starting server");
});
