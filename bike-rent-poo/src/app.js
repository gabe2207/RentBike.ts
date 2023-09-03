"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bike_1 = require("./bike");
const rent_1 = require("./rent");
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    registerBike(bike) {
        for (const rBike of this.bikes) {
            if (rBike.id === bike.id) {
                throw new Error("Duplicate Bike");
            }
        }
        this.bikes.push(bike);
    }
    findUser(email) {
        return this.users.find(user => { return user.email === email; });
    }
    registerUser(user) {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.');
            }
        }
        this.users.push(user);
    }
    removeUser(user) {
        let iU = this.users.indexOf(user);
        if (iU === -1)
            throw new Error('Usuario nao encontrado.');
        this.users.splice(iU, 1);
    }
    removeUserByEmail(email) {
        let U = this.users.find(u => u.email === email);
        if (U === undefined)
            throw new Error('Usuario nao encontrado.');
        this.removeUser(U);
    }
    rentBike2(Mod) {
        const Modelo = Mod.name;
        let rBike = bike_1.Bike;
        let BIKE = this.bikes.filter(b => b.name === Modelo);
        if (BIKE.length === 0)
            throw new Error('Bike não existe');
        let BikeEncontra = BIKE.find(e => e.Rented === !Mod.Rented);
        if (!BikeEncontra)
            throw new Error('Bike alugada');
        BikeEncontra.Rented === true;
        console.log('Bicicleta com o modelo ${name} foi alugada.');
    }
    rentBike(infoBike, userEmail, startDate, endDate) {
        let rBike = infoBike;
        let iBike = this.rents.filter(t => t.bike === infoBike);
        let rUser = this.users.find(u => u.email === userEmail);
        if (rUser === undefined)
            throw new Error('Usuário não cadastro');
        if (infoBike === undefined)
            throw new Error('Bike não existe');
        if (rBike.Rented === true)
            throw new Error('Bike alugada');
        let newRent = rent_1.Rent.create(iBike, infoBike, rUser, startDate, endDate);
        this.rents.push(newRent);
        rBike.Rented = true;
        console.log(`ID da bicicleta alugada: ${infoBike.id}`);
        return newRent;
    }
    retornarBike(ID) {
        const iD = ID.id;
        let BIKE = this.bikes.find(BIKE => BIKE.id === iD);
        if (BIKE === undefined)
            throw new Error('Bike não existe');
        if (BIKE.Rented == true)
            BIKE.Rented = false;
        console.log('Bike devolvida.');
    }
}
exports.App = App;
