"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const citizen_dto_1 = require("./../dto/citizen.dto");
const express_1 = __importDefault(require("express"));
const citizen_controller_1 = __importDefault(require("../controllers/citizen.controller"));
const exception_1 = require("../../lib/helpers/exception");
const upload_1 = require("../../services/upload");
const dto_validator_middleware_1 = __importDefault(require("../middleware/dto-validator.middleware"));
// import { Container } from "typedi";
const citizenRoutes = express_1.default.Router();
// get citizen controller from typedi container
// const citizenController = Container.get(CitizenController);
// GET /api/v1/citizens
citizenRoutes.get("/", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.getAllCitizens));
// POST /api/v1/citizens
citizenRoutes.post("/", upload_1.uploadService.single("photo"), (0, exception_1.withExceptionHandler)((0, dto_validator_middleware_1.default)(citizen_dto_1.CreateCitizenDTO)), (0, exception_1.withExceptionHandler)(citizen_controller_1.default.createCitizen));
// GET /api/v1/citizens/:id
citizenRoutes.get("/:id", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.getCitizenById));
// DELETE /api/v1/citizens/:id
citizenRoutes.delete("/:id", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.deleteCitizenById));
// PUT /api/v1/citizens/:id
citizenRoutes.put("/:id", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.updateCitizenById));
// GET /api/v1/citizens/:id/appeals
citizenRoutes.get("/:id/appeals", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.getCitizenAppeals));
// POST /api/v1/citizens/:id/appeals
citizenRoutes.post("/:id/appeals", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.createCitizenAppeal));
// DELETE /api/v1/citizens/:id/appeals/:appealId
citizenRoutes.delete("/:id/appeals/:appealId", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.deleteCitizenAppeal));
// PUT /api/v1/citizens/:id/appeals/:appealId
citizenRoutes.put("/:id/appeals/:appealId", (0, exception_1.withExceptionHandler)(citizen_controller_1.default.updateCitizenAppeal));
exports.default = citizenRoutes;
