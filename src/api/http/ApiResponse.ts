import { Response } from "express";

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
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    public success(status: number, data: any) {
        return this.res.status(status).json({
            success: true,
            status,
            data,
        });
    }

    public error(status: number, error: any): Response<ApiResponse, Record<string, ApiResponse>> {
        return this.res.status(status).json(error);
    }
}

export default ApiResponse;
