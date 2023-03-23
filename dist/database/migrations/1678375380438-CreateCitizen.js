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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCitizen1678375380438 = void 0;
class CreateCitizen1678375380438 {
    constructor() {
        this.name = 'CreateCitizen1678375380438';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "citizen" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "photo" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_1366af4c18e22dffff92a9b1514" UNIQUE ("email"), CONSTRAINT "PK_0e19d9fdbdd0d185ce72fe62a04" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "citizen"`);
        });
    }
}
exports.CreateCitizen1678375380438 = CreateCitizen1678375380438;
