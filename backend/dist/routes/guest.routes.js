"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestRoutes = void 0;
const celebrate_1 = require("celebrate");
const GuestController_1 = __importDefault(require("../app/controllers/GuestController"));
class GuestRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/guests', GuestController_1.default.index);
        this.routes.get('/guests/:name', celebrate_1.celebrate({ params: validations.paramName }), GuestController_1.default.show);
        this.routes.post('/guests', celebrate_1.celebrate({ body: validations.guest }), GuestController_1.default.store);
        this.routes.put('/guests/:id', celebrate_1.celebrate({ body: validations.guest, params: validations.paramId }), GuestController_1.default.update);
        this.routes.delete('/guests/:id', celebrate_1.celebrate({ params: validations.paramId }), GuestController_1.default.delete);
    }
}
exports.GuestRoutes = GuestRoutes;
