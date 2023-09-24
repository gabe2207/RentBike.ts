"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const crypt_1 = require("./crypt");
const AlreadyRegisterBike_1 = require("./erros/AlreadyRegisterBike");
const AlreadyRegisterUser_1 = require("./erros/AlreadyRegisterUser");
const RentnotFound_1 = require("./erros/RentnotFound");
const UnavailableBike_1 = require("./erros/UnavailableBike");
const UnregisteredBike_1 = require("./erros/UnregisteredBike");
const UserDoesNotExist_1 = require("./erros/UserDoesNotExist");
const rent_1 = require("./rent");
const crypto_1 = __importDefault(require("crypto"));
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
        this.crypt = new crypt_1.Crypt();
    }
    findUser(email) {
        return this.users.find(user => user.email === email);
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const rUser of this.users) {
                if (rUser.email === user.email) {
                    throw new AlreadyRegisterUser_1.AlreadyRegisterUser();
                }
            }
            const newId = crypto_1.default.randomUUID();
            user.id = newId;
            const encryptedPassword = yield this.crypt.encrypt(user.password);
            user.password = encryptedPassword;
            this.users.push(user);
            return newId;
        });
    }
    authenticate(userEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.findUser(userEmail);
            if (!user)
                throw new Error('User not found.');
            return yield this.crypt.compare(password, user.password);
        });
    }
    registerBike(bike) {
        const iBike = this.bikes.find(Ib => Ib === bike);
        if (iBike)
            throw new AlreadyRegisterBike_1.AlreadyRegisterBike();
        const newId = crypto_1.default.randomUUID();
        bike.id = newId;
        this.bikes.push(bike);
        return newId;
    }
    removeUser(email) {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return;
        }
        throw new UserDoesNotExist_1.UserDoesNotExist();
    }
    rentBike(bikeId, userEmail) {
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if (!bike) {
            throw new UnregisteredBike_1.UnregisteredBike();
        }
        if (!bike.available) {
            throw new UnavailableBike_1.UnavailableBike();
        }
        const user = this.findUser(userEmail);
        if (!user) {
            throw new UserDoesNotExist_1.UserDoesNotExist();
        }
        bike.available = false;
        const newRent = new rent_1.Rent(bike, user, new Date());
        this.rents.push(newRent);
    }
    returnBike(bikeId, userEmail) {
        const now = new Date();
        const rent = this.rents.find(rent => rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            !rent.end);
        if (!rent)
            throw new RentnotFound_1.RentnotFound();
        rent.end = now;
        rent.bike.available = true;
        const hours = diffHours(rent.end, rent.start);
        return hours * rent.bike.rate;
    }
    listUsers() {
        return this.users;
    }
    listBikes() {
        return this.bikes;
    }
    listRents() {
        return this.rents;
    }
    moveBikeTo(bikeId, location) {
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if (!bike)
            throw new UnregisteredBike_1.UnregisteredBike();
        bike.position.latitude = location.latitude;
        bike.position.longitude = location.longitude;
    }
}
exports.App = App;
function diffHours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
}
