"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealStatus = void 0;
var AppealStatus;
(function (AppealStatus) {
    AppealStatus[AppealStatus["PENDING"] = 0] = "PENDING";
    AppealStatus[AppealStatus["ACCEPTED"] = 1] = "ACCEPTED";
    AppealStatus[AppealStatus["REJECTED"] = 2] = "REJECTED";
    AppealStatus[AppealStatus["CANCELLED"] = 3] = "CANCELLED";
    AppealStatus[AppealStatus["COMPLETED"] = 4] = "COMPLETED";
    AppealStatus[AppealStatus["EXPIRED"] = 5] = "EXPIRED";
    AppealStatus[AppealStatus["DELETED"] = 6] = "DELETED";
})(AppealStatus = exports.AppealStatus || (exports.AppealStatus = {}));
