import ExceptionHandler from "../interfaces/ExceptionHandler";
import ApiResponse from "../http/ApiResponse";
import BaseException from "./BaseException";
import { NextFunction, Request, Response } from "express";
// import InternalServerException from "./InternalServerException";

class BaseExceptionHandler implements ExceptionHandler {
    // accepts error, request, response and next function
    handleException(error: BaseException, _req: Request, res: Response, _next: NextFunction) {
        console.log("here", error)

        return new ApiResponse(res).error(error.status, error)
    }
}

export default new BaseExceptionHandler();