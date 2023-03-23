"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __importDefault(require("./BaseException"));
class EntityException extends BaseException_1.default {
    constructor(error) {
        super(error.message, error.status);
    }
}
exports.default = EntityException;
