"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentNotFoundError = void 0;
class RentNotFoundError extends Error {
    constructor() {
        super('Unavailable rent.');
        this.name = ' RentNotFoundError';
    }
}
exports.RentNotFoundError = RentNotFoundError;
