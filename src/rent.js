"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
class Rent {
    constructor(bike, user, start) {
        this.bike = bike;
        this.user = user;
        this.start = start;
        this.end = undefined;
    }
}
exports.Rent = Rent;
