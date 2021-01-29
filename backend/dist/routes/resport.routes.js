"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const celebrate_1 = require("celebrate");
const ReportController_1 = __importDefault(require("../app/controllers/ReportController"));
class ReportRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/reports', celebrate_1.celebrate({ query: validations.report }), ReportController_1.default.index);
    }
}
exports.ReportRoutes = ReportRoutes;
