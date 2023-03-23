"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse_1 = __importDefault(require("../http/ApiResponse"));
// import InternalServerException from "./InternalServerException";
class BaseExceptionHandler {
    // accepts error, request, response and next function
    handleException(error, _req, res, _next) {
        console.log("here", error);
        return new ApiResponse_1.default(res).error(error.status, error);
    }
}
exports.default = new BaseExceptionHandler();
