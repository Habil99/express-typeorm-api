"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CitizenController_1 = __importDefault(require("../controllers/CitizenController"));
const exception_1 = require("../../lib/helpers/exception");
// import { Container } from "typedi";
const citizenRoutes = express_1.default.Router();
// get citizen controller from typedi container
// const citizenController = Container.get(CitizenController);
// GET /api/v1/citizens
citizenRoutes.get("/", (0, exception_1.withExceptionHandler)(CitizenController_1.default.getAllCitizens));
// POST /api/v1/citizens
citizenRoutes.post("/", (0, exception_1.withExceptionHandler)(CitizenController_1.default.createCitizen));
// GET /api/v1/citizens/:id
citizenRoutes.get("/:id", (0, exception_1.withExceptionHandler)(CitizenController_1.default.getCitizenById));
// DELETE /api/v1/citizens/:id
citizenRoutes.delete("/:id", (0, exception_1.withExceptionHandler)(CitizenController_1.default.deleteCitizenById));
// PUT /api/v1/citizens/:id
citizenRoutes.put("/:id", (0, exception_1.withExceptionHandler)(CitizenController_1.default.updateCitizenById));
exports.default = citizenRoutes;
