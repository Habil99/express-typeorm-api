"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCEPTION_TYPE = exports.APPEAL_MESSAGE = exports.CITIZEN_MESSAGE = void 0;
exports.CITIZEN_MESSAGE = {
    NOT_FOUND: "Citizen not found",
    ALREADY_EXISTS: "Citizen already exists",
    BAD_REQUEST: "Invalid citizen data",
    VALIDATION_ERROR: "Data validation error",
};
exports.APPEAL_MESSAGE = {
    NOT_FOUND: "Appeal not found",
    ALREADY_EXISTS: "Appeal already exists",
    BAD_REQUEST: "Invalid appeal data",
    STATUS_INVALID: "Invalid appeal status",
};
exports.EXCEPTION_TYPE = {
    DATABASE: "DatabaseException",
    VALIDATION: "ValidationException",
};
