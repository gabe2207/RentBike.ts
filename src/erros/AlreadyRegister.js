"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyRegister = void 0;
class AlreadyRegister extends Error {
    constructor() {
        super('Bike already exist');
        this.name = 'AlreadyRegister';
    }
}
exports.AlreadyRegister = AlreadyRegister;
