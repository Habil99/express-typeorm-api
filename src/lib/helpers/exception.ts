import { NextFunction, Request, Response } from "express";
import { ServerResponse } from "http";
import ApiResponse from "../../api/http/ApiResponse";

export const withExceptionHandler = (fn: Function) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const response = await fn(req, res, next)

            if (response instanceof ServerResponse) {
                return response;
            }

            return new ApiResponse(res).success(200, response);
        } catch (error: any) {
            return next({
                success: error.success || false,
                status: error.status || 500,
                message: error.message,
                details: error.details,
                stack: error.stack
            })
        }
    };
}