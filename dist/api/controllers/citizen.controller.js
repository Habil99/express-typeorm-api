"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CitizenService_1 = __importDefault(require("../services/CitizenService"));
const constants_1 = require("../../config/constants");
const logger_1 = __importDefault(require("../../config/logger"));
const ApiResponse_1 = __importDefault(require("../http/ApiResponse"));
class CitizenController {
    static getAllCitizens() {
        return CitizenService_1.default.getAllCitizens();
    }
    static createCitizen(req, res) {
        var _a;
        // call service to create citizen
        return CitizenService_1.default.createCitizen(req.body, (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)
            .then((citizen) => {
            /**
             *  TODO: add logger service with mongodb
             */
            logger_1.default.log("info", "Citizen created successfully");
            return new ApiResponse_1.default(res).success(constants_1.STATUS_CODE.CREATED, citizen);
        });
    }
    static getCitizenById(req, res) {
        return CitizenService_1.default.getCitizenById(+req.params.id)
            .then((citizen) => {
            logger_1.default.log("info", "Citizen found successfully");
            return new ApiResponse_1.default(res).success(constants_1.STATUS_CODE.OK, citizen);
        });
    }
    static deleteCitizenById(req) {
        return CitizenService_1.default.deleteCitizenById(+req.params.id);
    }
    static updateCitizenById(req) {
        return CitizenService_1.default.updateCitizenById(+req.params.id, req.body);
    }
    static getCitizenAppeals() {
        return CitizenService_1.default.getCitizenAppeals();
    }
    static createCitizenAppeal(req) {
        return CitizenService_1.default.createCitizenAppeal(+req.params.id, req.body);
    }
    static deleteCitizenAppeal(req) {
        return CitizenService_1.default.deleteCitizenAppeal(+req.params.appealId);
    }
    static updateCitizenAppeal(req) {
        return CitizenService_1.default.updateCitizenAppeal(+req.params.appealId, req.body);
    }
}
exports.default = CitizenController;
