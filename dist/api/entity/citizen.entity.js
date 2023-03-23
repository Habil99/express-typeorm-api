"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.CitizenEntity = void 0;
const typeorm_1 = require("typeorm");
const appeal_entity_1 = require("./appeal.entity");
const class_validator_1 = require("class-validator");
const regex_1 = require("../../lib/constants/regex");
const CitizenException_1 = __importDefault(require("../exceptions/CitizenException"));
const constants_1 = require("../../config/constants");
const exception_1 = require("../../types/exception");
let CitizenEntity = class CitizenEntity {
    constructor(dto, filename) {
        if (dto)
            this.createFromDTO(dto, filename);
    }
    createFromDTO(dto, filename) {
        Object.assign(this, dto);
        this.photo = filename || "";
        return this;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(this, {
                validationError: {
                    target: false,
                },
            });
            if (errors.length === 0)
                return this;
            throw new CitizenException_1.default({
                status: constants_1.STATUS_CODE.BAD_REQUEST,
                message: exception_1.CITIZEN_MESSAGE.BAD_REQUEST,
                details: errors.map((error) => error.constraints).map((constraint) => ({
                    message: Object.values(constraint)[0],
                }))
            });
        });
    }
    toDTO() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            address: this.address,
            photo: this.photo,
            appeals: this.appeals.map(appeal => appeal.toDTO()),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CitizenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: "Name is required"
    }),
    (0, class_validator_1.IsString)({
        message: "Name must be a string"
    }),
    __metadata("design:type", String)
], CitizenEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    (0, class_validator_1.IsEmail)({}, {
        message: "Email is invalid"
    }),
    __metadata("design:type", String)
], CitizenEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Matches)(regex_1.Regex.PHONE, {
        message: "Phone is in invalid format",
        // change matches to phone in response
    }),
    __metadata("design:type", String)
], CitizenEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Address is required"
    }),
    (0, class_validator_1.IsString)({
        message: "Address must be a string"
    }),
    __metadata("design:type", String)
], CitizenEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], CitizenEntity.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appeal_entity_1.AppealEntity, appeal => appeal.citizen),
    __metadata("design:type", Array)
], CitizenEntity.prototype, "appeals", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], CitizenEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Date)
], CitizenEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], CitizenEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], CitizenEntity.prototype, "deleted", void 0);
CitizenEntity = __decorate([
    (0, typeorm_1.Entity)({
        orderBy: {
            createdAt: "DESC",
        }
    }),
    __metadata("design:paramtypes", [Object, String])
], CitizenEntity);
exports.CitizenEntity = CitizenEntity;
