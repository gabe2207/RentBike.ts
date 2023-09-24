"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnavailableBike = void 0;
class UnavailableBike extends Error {
    constructor() {
        super('Bike is not available');
        this.name = 'UnavailableBike';
    }
}
exports.UnavailableBike = UnavailableBike;
