"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccommodationRoutes = void 0;
const celebrate_1 = require("celebrate");
const AccommodationController_1 = __importDefault(require("../app/controllers/AccommodationController"));
class AccommodationRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.post('/accommodations', celebrate_1.celebrate({ body: validations.accommodation }), AccommodationController_1.default.store);
        this.routes.put('/accommodations/:id', celebrate_1.celebrate({ body: validations.accommodation, params: validations.paramId }), AccommodationController_1.default.update);
        this.routes.delete('/accommodations/:id', celebrate_1.celebrate({ params: validations.paramId }), AccommodationController_1.default.delete);
    }
}
exports.AccommodationRoutes = AccommodationRoutes;
