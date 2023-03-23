"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../database/data-source");
const appeal_entity_1 = require("../entity/appeal.entity");
const AppealRepository = data_source_1.AppDataSource.getRepository(appeal_entity_1.AppealEntity);
exports.default = AppealRepository;
