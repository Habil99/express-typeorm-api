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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../enums");
const citizen_entity_1 = require("./citizen.entity");
const class_validator_1 = require("class-validator");
let AppealEntity = class AppealEntity {
    createFromDTO(dto) {
        this.title = dto.title;
        this.description = dto.description;
        this.status = dto.status;
        return this;
    }
    toDTO() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            citizen: this.citizen.id,
        };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppealEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Title is required"
    }),
    __metadata("design:type", String)
], AppealEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Description is required"
    }),
    __metadata("design:type", String)
], AppealEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Matches)(new RegExp(`^(${Object.values(enums_1.AppealStatus).join("|")})$`), {
        message: "Invalid appeal status"
    }),
    __metadata("design:type", Number)
], AppealEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => citizen_entity_1.CitizenEntity, citizen => citizen.appeals, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", citizen_entity_1.CitizenEntity)
], AppealEntity.prototype, "citizen", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    }),
    __metadata("design:type", Date)
], AppealEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    }),
    __metadata("design:type", Date)
], AppealEntity.prototype, "updatedAt", void 0);
AppealEntity = __decorate([
    (0, typeorm_1.Entity)()
], AppealEntity);
exports.AppealEntity = AppealEntity;
