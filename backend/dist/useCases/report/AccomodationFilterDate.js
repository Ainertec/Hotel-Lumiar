"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccomodationFilterDateUseCase = void 0;
class AccomodationFilterDateUseCase {
    constructor(AccommodationModel) {
        this.AccommodationModel = AccommodationModel;
    }
    async execute(reqInicial, reqFinal) {
        const initial = String(reqInicial);
        const final = String(reqFinal);
        const accommodationGroup = await this.AccommodationModel.find({
            createdAt: { $gte: initial, $lte: final },
        });
        const accommodationFilter = accommodationGroup[0] ? true : false;
        return {
            accommodationFilter
        };
    }
}
exports.AccomodationFilterDateUseCase = AccomodationFilterDateUseCase;
