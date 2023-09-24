"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnregisteredBike = void 0;
class UnregisteredBike extends Error {
    constructor() {
        super('Unregistered Bike');
        this.name = 'UnregisteredBike';
    }
}
exports.UnregisteredBike = UnregisteredBike;
