"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODE = exports.SERVER_PORT = exports.DATABASE_PORT = exports.DATABASE_HOST = exports.DATABASE_PASSWORD = exports.DATABASE_USER = exports.DATABASE_NAME = exports.DATABASE_URL = void 0;
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.DATABASE_NAME = process.env.DATABASE_NAME;
exports.DATABASE_USER = process.env.DATABASE_USER;
exports.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.DATABASE_HOST = process.env.DATABASE_HOST;
exports.DATABASE_PORT = process.env.DATABASE_PORT;
exports.SERVER_PORT = process.env.SERVER_PORT;
exports.STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};
