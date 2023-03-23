"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {string} res: Response
 * @method success
 * @description This method returns a success response
 * @method error
 * @description This method returns an error response
 * @param error: Exception
 * @design pattern: Factory pattern -> https://refactoring.guru/design-patterns/factory-method
 */
class ApiResponse {
    constructor(res) {
        this.res = res;
    }
    success(status, data) {
        return this.res.status(status).json({
            success: true,
            status,
            data,
        });
    }
    error(status, error) {
        return this.res.status(status).json(error);
    }
}
exports.default = ApiResponse;
