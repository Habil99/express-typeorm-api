// Description: This file is the entry point of the application
import express from "express";
// Import reflect-metadata to use decorators
import "reflect-metadata";

// Load environment variables
import dotenv from "dotenv"

dotenv.config({ path: __dirname + "/../.env" });

// Import data source to connect to database
import { AppDataSource } from "./database/data-source";

// Import routes
// Import constants to use server port
import { SERVER_PORT } from "./config/constants";
import appRouter from "./api";
import baseExceptionHandler from "./api/exceptions/BaseExceptionHandler";
import helmet from "helmet";
import logger from "./config/logger";

// Create express app
const app = express();

// use helmet for security
app.use(helmet());

// Use json parser
app.use(express.json());

// add default endpoint api/v1  to all routes
app.use("/api/v1", appRouter);

// add exception handler
app.use(baseExceptionHandler.handleException)

// Start server
app.listen(3000, () => {
    AppDataSource.initialize()
        .then(() => {
            console.log(`Server listening on port ${SERVER_PORT}, database connected`);
        }).catch((error) => {
        logger.log("error", error);
    })
}).on("error", (error) => {
    console.error(error, "Error while starting server");
})
