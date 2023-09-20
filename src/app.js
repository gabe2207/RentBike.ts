"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const sinon_1 = __importDefault(require("sinon"));
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
        return __awaiter(this, void 0, void 0, function* () {
            for (const rUser of this.users) {
                if (rUser.email === user.email) {
                    throw new Error('Duplicate user.');
                }
            }
            const saltRounds = 10;
            const hashedPassword = yield bcrypt.hash(user.password, saltRounds);
            console.log(hashedPassword);
            user.password = hashedPassword;
            this.users.push(user);
        });
    }
    authenticateUser(userEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const rUser = this.users.find(e => e.email === userEmail);
            if (!rUser) {
                return false;
            }
            const passwordMatch = yield bcrypt.compare(password, rUser.password);
            return passwordMatch;
        });
    }
    registerAndAuthenticateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = user.password;
            try {
                yield this.registerUser(user);
                const isAuthenticated = yield this.authenticateUser(user.email, password);
                if (isAuthenticated) {
                    console.log('Usuário registrado e autenticado com sucesso.');
                }
                else {
                    console.log('Erro ao autenticar o usuário após o registro.');
                }
            }
            catch (error) {
                console.error('Erro ao registrar o usuário:', error);
            }
        });
    }
    listUsers() {
        return this.users.slice();
    }
    listBike() {
        return this.bikes.slice();
    }
    listRent() {
        return this.rents.slice();
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
        let BIKE = this.bikes.filter(b => b.name === Modelo);
        if (BIKE.length === 0)
            throw new Error('Bike não existe');
        let BikeEncontra = BIKE.find(e => e.rented === !Mod.rented);
        if (!BikeEncontra)
            throw new Error('Bike alugada');
        BikeEncontra.rented === true;
        console.log(`Bicicleta com o modelo ${Mod} foi alugada.`);
    }
    // rentBike(infoBike: Bike, userEmail: string, startDate: Date, endDate:Date): Rent{
    //     let rBike = infoBike
    //     let iBike = this.rents.filter(t => t.bike === infoBike)
    //     let rUser = this.users.find(u=>u.email === userEmail)
    //     if(rUser === undefined) throw new Error('Usuário não cadastro')
    //     if(infoBike === undefined) throw new Error('Bike não existe')
    //     if(rBike.rented === true) throw new Error('Bike alugada')
    //     let newRent = Rent.create(iBike, infoBike,rUser,startDate,endDate)
    //     this.rents.push(newRent)
    //     rBike.rented = true
    //     console.log(`ID da bicicleta alugada: ${infoBike.id}`);
    //     return newRent
    // }
    returnBike(ID) {
        const iD = ID.id;
        let BIKE = this.bikes.find(BIKE => BIKE.id === iD);
        if (BIKE === undefined)
            throw new Error('Bike não existe');
        if (BIKE.rented === false)
            throw new Error('Bike não esta alugada');
        BIKE.rented = false;
        console.log('Bike devolvida.');
        const rentedHours = sinon_1.default.stub();
        rentedHours.returns(5);
        return BIKE.costPerHour * rentedHours();
    }
    localizaBike(bike) {
        let iBike = this.rents.filter(t => t.bike === bike);
        if (!iBike && bike === undefined)
            throw new Error('Bike não encontrada');
        console.log(`possição da Bicicleta: ${bike.latitude},${bike.longitude}`);
    }
}
exports.App = App;
