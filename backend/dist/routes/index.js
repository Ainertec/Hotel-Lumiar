"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guest_routes_1 = require("./guest.routes");
const accommodations_routes_1 = require("./accommodations.routes");
// validations
const guestSchema_1 = __importDefault(require("../validations/guestSchema"));
const accommodationSchema_1 = __importDefault(require("../validations/accommodationSchema"));
;
const commonSchema_1 = require("../validations/commonSchema");
const routes = express_1.Router();
// guests
const guestRouters = new guest_routes_1.GuestRoutes(routes);
guestRouters.getRoutes({ guest: guestSchema_1.default, paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId });
// accommodations
const accommodationRoutes = new accommodations_routes_1.AccommodationRoutes(routes);
accommodationRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, accommodation: accommodationSchema_1.default });
exports.default = routes;
