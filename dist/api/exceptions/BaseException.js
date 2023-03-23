"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * BaseException
 * @class
 * @param {string} message
 * @param {number} status
 * @returns {message, code, status}
 */
class BaseException extends Error {
    constructor(message, status, details) {
        super(message || "Internal Server Error");
        this.message = message;
        this.status = status;
        this.details = details;
        this.success = false;
        this.success = false;
        this.status = status;
        this.details = details;
    }
}
exports.default = BaseException;
