"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    }
});
exports.uploadService = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});
