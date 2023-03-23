"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.colorize(), winston_1.default.format.splat(), winston_1.default.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: './src/logs/error.log', level: 'error' }),
                new winston_1.default.transports.File({ filename: './src/logs/combined.log' }),
            ],
        });
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(level, message) {
        this.logger.log(level, message);
    }
}
exports.default = Logger.getInstance();
