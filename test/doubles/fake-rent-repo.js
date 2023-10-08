"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeRentRepo = void 0;
class FakeRentRepo {
    constructor() {
        this.rents = [];
    }
    add(rent) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Math.random().toString(36).substring(2, 15); // Gera um ID aleatório
            rent.id = id;
            this.rents.push(rent);
            console.log('Rent added to repo:', rent); // Log para verificação
            return id;
        });
    }
    findOpen(bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rents.find(rent => rent.bike.id === bikeId &&
                rent.user.email === userEmail &&
                !rent.end);
        });
    }
    update(id, rent) {
        return __awaiter(this, void 0, void 0, function* () {
            const rentIndex = this.rents.findIndex(rent => rent.id === id);
            if (rentIndex !== -1)
                this.rents[rentIndex] = rent;
        });
    }
    findOpenRentsFor(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const openRents = this.rents.filter(rent => rent.email === email && !rent.end);
            return openRents;
        });
    }
}
exports.FakeRentRepo = FakeRentRepo;
