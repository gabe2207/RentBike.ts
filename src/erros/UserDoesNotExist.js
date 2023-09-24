"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDoesNotExist = void 0;
class UserDoesNotExist extends Error {
    constructor() {
        super('User Does Not Exist');
        this.name = 'UserDoesNotExist';
    }
}
exports.UserDoesNotExist = UserDoesNotExist;
