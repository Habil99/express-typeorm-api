"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../database/data-source");
const citizen_entity_1 = require("../entity/citizen.entity");
const CitizenRepository = data_source_1.AppDataSource.getRepository(citizen_entity_1.CitizenEntity);
exports.default = CitizenRepository;
