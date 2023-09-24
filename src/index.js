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
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
const sinon_1 = __importDefault(require("sinon"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const clock = sinon_1.default.useFakeTimers();
        const app = new app_1.App();
        const user1 = new user_1.User('Jose', 'jose@mail.com', '1234');
        yield app.registerUser(user1);
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        app.registerBike(bike);
        console.log('Bike disponível: ', bike.available);
        app.rentBike(bike.id, user1.email);
        console.log('Bike disponível: ', bike.available);
        clock.tick(1000 * 60 * 65);
        console.log(app.returnBike(bike.id, user1.email));
        console.log('Bike disponível: ', bike.available);
    });
}
main();
