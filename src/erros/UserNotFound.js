"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFound = void 0;
class UserNotFound extends Error {
    constructor() {
        super('User not Found in our system');
        this.name = 'UserNotFound';
    }
}
exports.UserNotFound = UserNotFound;
