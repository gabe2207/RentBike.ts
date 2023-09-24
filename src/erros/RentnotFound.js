"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentnotFound = void 0;
class RentnotFound extends Error {
    constructor() {
        super('Rent not found');
        this.name = 'RentnotFound';
    }
}
exports.RentnotFound = RentnotFound;
