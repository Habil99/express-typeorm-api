import { NextFunction, Request, Response } from "express";
import ApiResponse from "../http/ApiResponse";
import BaseException from "../exceptions/BaseException";

export default interface ExceptionHandler {
    handleException(exception: BaseException, req: Request, res: Response, next: NextFunction):  Response<ApiResponse, Record<string, ApiResponse>>;
}