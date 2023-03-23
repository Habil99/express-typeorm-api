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
const class_validator_1 = require("class-validator");
const constants_1 = require("../../config/constants");
const CitizenException_1 = __importDefault(require("../exceptions/CitizenException"));
function dtoValidatorMiddleware(dto, skipMissingProps = false) {
    return (_req, _res, next) => __awaiter(this, void 0, void 0, function* () {
        const createCitizenDto = new dto(_req.body);
        const errors = yield (0, class_validator_1.validate)(createCitizenDto, {
            skipMissingProperties: skipMissingProps,
        });
        if (errors.length > 0) {
            throw new CitizenException_1.default({
                status: constants_1.STATUS_CODE.BAD_REQUEST,
                message: "Bad request",
                details: errors.map((error) => ({
                    [error.property]: Object.values(error.constraints).join(", "),
                })),
            });
        }
        else {
            next();
        }
    });
}
exports.default = dtoValidatorMiddleware;
