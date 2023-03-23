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
const citizen_entity_1 = require("../entity/citizen.entity");
const CitizenRepository_1 = __importDefault(require("../repositories/CitizenRepository"));
const CitizenException_1 = __importDefault(require("../exceptions/CitizenException"));
const constants_1 = require("../../config/constants");
const exception_1 = require("../../types/exception");
const AppealRepository_1 = __importDefault(require("../repositories/AppealRepository"));
const appeal_entity_1 = require("../entity/appeal.entity");
class CitizenService {
    static getAllCitizens() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CitizenRepository_1.default.find({ relations: { appeals: true } });
        });
    }
    static createCitizen(citizenDTO, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const citizenExists = yield CitizenRepository_1.default.findOne({ where: { email: citizenDTO.email } });
            if (citizenExists) {
                throw new CitizenException_1.default({
                    status: constants_1.STATUS_CODE.BAD_REQUEST,
                    message: exception_1.CITIZEN_MESSAGE.ALREADY_EXISTS
                });
            }
            return yield CitizenRepository_1.default.save(new citizen_entity_1.CitizenEntity(citizenDTO, filename));
        });
    }
    static getCitizenById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const citizen = yield CitizenRepository_1.default.findOne({ where: { id } });
            if (!citizen) {
                throw new CitizenException_1.default({
                    status: constants_1.STATUS_CODE.NOT_FOUND,
                    message: exception_1.CITIZEN_MESSAGE.NOT_FOUND
                });
            }
            return citizen;
        });
    }
    static deleteCitizenById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CitizenRepository_1.default.softDelete({ id }).then((result) => {
                if (result.affected === 0)
                    throw new CitizenException_1.default({
                        status: constants_1.STATUS_CODE.NOT_FOUND,
                        message: exception_1.CITIZEN_MESSAGE.NOT_FOUND
                    });
                // update deleted column
                CitizenRepository_1.default.update({ id }, { deleted: true });
                return {};
            });
        });
    }
    static updateCitizenById(id, citizen) {
        return __awaiter(this, void 0, void 0, function* () {
            // add to entity
            return yield CitizenRepository_1.default.update({ id }, citizen)
                .then((result) => {
                if (result.affected === 0)
                    throw new CitizenException_1.default({
                        status: constants_1.STATUS_CODE.NOT_FOUND,
                        message: exception_1.CITIZEN_MESSAGE.NOT_FOUND
                    });
                return this.getCitizenById(id);
            });
        });
    }
    static getCitizenAppeals() {
        return __awaiter(this, void 0, void 0, function* () {
            const appeals = yield AppealRepository_1.default.find({
                where: { citizen: false }
            });
            return appeals || [];
        });
    }
    static createCitizenAppeal(id, appeal) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if citizen exists
            const citizen = yield this.getCitizenById(id);
            if (!citizen)
                throw new CitizenException_1.default({
                    status: constants_1.STATUS_CODE.NOT_FOUND,
                    message: exception_1.CITIZEN_MESSAGE.NOT_FOUND
                });
            // create appeal
            const newAppeal = new appeal_entity_1.AppealEntity();
            newAppeal.createFromDTO(appeal);
            // add citizen to appeal
            newAppeal.citizen = citizen;
            // save appeal
            const savedAppeal = yield AppealRepository_1.default.save(newAppeal);
            if (!savedAppeal)
                throw new CitizenException_1.default({
                    status: constants_1.STATUS_CODE.BAD_REQUEST,
                    message: exception_1.APPEAL_MESSAGE.BAD_REQUEST
                });
            return savedAppeal;
        });
    }
    static deleteCitizenAppeal(appealId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppealRepository_1.default.delete({ id: appealId }).then((result) => {
                if (result.affected === 0)
                    throw new CitizenException_1.default({
                        status: constants_1.STATUS_CODE.NOT_FOUND,
                        message: exception_1.APPEAL_MESSAGE.NOT_FOUND
                    });
                return {};
            });
        });
    }
    static updateCitizenAppeal(appealId, appeal) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if appeal exists
            const appealEntity = yield AppealRepository_1.default.findOne({ where: { id: appealId } });
            if (!appealEntity)
                throw new CitizenException_1.default({
                    status: constants_1.STATUS_CODE.NOT_FOUND,
                    message: exception_1.APPEAL_MESSAGE.NOT_FOUND
                });
            // save appeal
            const savedAppeal = yield AppealRepository_1.default.save(new appeal_entity_1.AppealEntity().createFromDTO(appeal));
            if (!savedAppeal)
                throw new CitizenException_1.default({
                    status: constants_1.STATUS_CODE.BAD_REQUEST,
                    message: exception_1.APPEAL_MESSAGE.BAD_REQUEST
                });
            return savedAppeal;
        });
    }
}
exports.default = CitizenService;
