"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyRegisterBike = void 0;
class AlreadyRegisterBike extends Error {
    constructor() {
        super('Bike already exist');
        this.name = 'AlreadyRegisterBike';
    }
}
exports.AlreadyRegisterBike = AlreadyRegisterBike;
