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
exports.CreateCitizenDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateCitizenDTO {
    constructor(name, email, phone, address, photo) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.photo = photo;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: "Name is required"
    }),
    __metadata("design:type", String)
], CreateCitizenDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, {
        message: "Email is invalid"
    }),
    __metadata("design:type", String)
], CreateCitizenDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: "Phone is required"
    }),
    __metadata("design:type", String)
], CreateCitizenDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: "Address is required"
    }),
    __metadata("design:type", String)
], CreateCitizenDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCitizenDTO.prototype, "photo", void 0);
exports.CreateCitizenDTO = CreateCitizenDTO;
