import winston from "winston";
import { LoggerLevel } from "./types";

class Logger {
  private static instance: Logger;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './src/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './src/logs/combined.log' }),
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(level: LoggerLevel, message: string) {
    this.logger.log(level, message);
  }
}

export default Logger.getInstance();