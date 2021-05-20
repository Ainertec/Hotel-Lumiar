"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Guest_1 = __importDefault(require("../models/Guest"));
class ReportsController {
    async index(request, response) {
        const initial = String(request.query.initial);
        const final = String(request.query.final);
        const guests = await Guest_1.default.find({}).populate('accommodations');
        let objetoFinal = [], partesDataInicio = initial.split("-"), partesDataFinal = final.split("-");
        guests.map(guest => {
            const guestvalid = guest.accommodations.find(accommodation => {
                const partesData = (accommodation.checkin).split("-");
                return ((parseInt(partesData[0] + partesData[1] + partesData[2]) >= parseInt(partesDataInicio[0] + partesDataInicio[1] + partesDataInicio[2])) && (parseInt(partesData[0] + partesData[1] + partesData[2]) <= parseInt(partesDataFinal[0] + partesDataFinal[1] + partesDataFinal[2])));
                //(partesData[0] >= partesDataInicio[0] && partesData[0] <= partesDataFinal[0] && partesData[1] >= partesDataInicio[1] && partesData[1] <= partesDataFinal[1] && partesData[2] >= partesDataInicio[2] && partesData[2] <= partesDataFinal[2]);
            });
            if (guestvalid) {
                objetoFinal.push(guest);
            }
        });
        return response.json(objetoFinal);
    }
}
exports.default = new ReportsController();
