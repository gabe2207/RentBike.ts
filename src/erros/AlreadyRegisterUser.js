"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyRegisterUser = void 0;
class AlreadyRegisterUser extends Error {
    constructor() {
        super('Already Register User');
        this.name = 'AlreadyRegisterUser';
    }
}
exports.AlreadyRegisterUser = AlreadyRegisterUser;
