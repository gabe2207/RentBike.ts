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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const bike = new bike_1.Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], '101', 15, -100, 200, false);
        const bike2 = new bike_1.Bike('run bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], '111', 40, 100, 30, true);
        const user = new user_1.User('Maria', 'maria@mail.com', '1234');
        const today = new Date();
        const twoDaysFromToday = new Date();
        twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const sevenDaysFromToday = new Date();
        sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);
        const user2 = new user_1.User('Gabriel', 'gabriel@mail.com', '3123');
        const app = new app_1.App();
        //USER:
        //await app.registerUser(user);
        //await app.registerAndAuthenticateUser(user);
        //console.log(app.listUsers());
        //console.log(JSON.stringify(app, undefined, 2));
        //app.removeUser(user)
        //console.log(app.findUser('maria@mail.com'))
        //BIKE
        app.registerBike(bike);
        //app.registerBike(bike2)
        //console.log(app.listBike());
        //console.log(bike)
        app.localizaBike(bike);
        //RENT
        //app.rentBike(bike,'maria@mail.com',today,twoDaysFromToday)
        //app.rentBike(bike,'gabriel@mail.com',today,twoDaysFromToday)
        //app.listRent()
        //app.retornarBike(bike)
    });
}
main();
