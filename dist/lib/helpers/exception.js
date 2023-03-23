"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withExceptionHandler = void 0;
const http_1 = require("http");
const ApiResponse_1 = __importDefault(require("../../api/http/ApiResponse"));
const withExceptionHandler = (fn) => {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fn(req, res, next);
                if (response instanceof http_1.ServerResponse) {
                    return response;
                }
                return new ApiResponse_1.default(res).success(200, response);
            }
            catch (error) {
                return next({
                    success: error.success || false,
                    status: error.status || 500,
                    message: error.message,
                    details: error.details,
                    stack: error.stack
                });
            }
        });
    };
};
exports.withExceptionHandler = withExceptionHandler;
