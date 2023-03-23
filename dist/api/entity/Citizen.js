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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Citizen = void 0;
const typeorm_1 = require("typeorm");
const EntityException_1 = __importDefault(require("../exceptions/EntityException"));
const constants_1 = require("../../config/constants");
const EmailValidator_1 = __importDefault(require("../validators/EmailValidator"));
let Citizen = class Citizen {
    validate() {
        const emailValidator = new EmailValidator_1.default();
        if (!this.name)
            throw new EntityException_1.default({ message: "Name is required", status: constants_1.STATUS_CODE.BAD_REQUEST });
        if (!this.email)
            throw new EntityException_1.default({ message: "Email is required", status: constants_1.STATUS_CODE.BAD_REQUEST });
        if (!emailValidator.validate(this.email))
            throw new EntityException_1.default({
                message: "Email is invalid",
                status: constants_1.STATUS_CODE.BAD_REQUEST
            });
        if (!this.phone)
            throw new EntityException_1.default({ message: "Phone is required", status: constants_1.STATUS_CODE.BAD_REQUEST });
        if (!this.address)
            throw new EntityException_1.default({
                message: "Address is required",
                status: constants_1.STATUS_CODE.BAD_REQUEST
            });
    }
    validatePartial(partial) {
        // check if email is valid, if not, throw error
        if (partial.email) {
            const emailValidator = new EmailValidator_1.default();
            if (!emailValidator.validate(partial.email))
                throw new EntityException_1.default({
                    message: "Email is invalid",
                    status: constants_1.STATUS_CODE.BAD_REQUEST
                });
        }
        // check if partial has any property
        return Object.keys(partial).length > 0;
    }
    addProperties(partial) {
        Object.assign(this, partial);
        return this;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Citizen.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    __metadata("design:type", String)
], Citizen.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], Citizen.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Citizen.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Citizen.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Citizen.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], Citizen.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Date)
], Citizen.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Citizen.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], Citizen.prototype, "deleted", void 0);
Citizen = __decorate([
    (0, typeorm_1.Entity)({
        orderBy: {
            createdAt: "DESC",
        }
    })
], Citizen);
exports.Citizen = Citizen;
