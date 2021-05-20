"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleRoutes = void 0;
const celebrate_1 = require("celebrate");
const RuleController_1 = __importDefault(require("../app/controllers/RuleController"));
class RuleRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/rules', RuleController_1.default.index);
        this.routes.post('/rules', celebrate_1.celebrate({ body: validations.rule }), RuleController_1.default.store);
        this.routes.put('/rules/:id', celebrate_1.celebrate({ body: validations.rule, params: validations.paramId }), RuleController_1.default.update);
        this.routes.delete('/rules/:id', celebrate_1.celebrate({ params: validations.paramId }), RuleController_1.default.delete);
    }
}
exports.RuleRoutes = RuleRoutes;
