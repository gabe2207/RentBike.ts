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
const sinon_1 = __importDefault(require("sinon"));
const app_1 = require("../src/app");
const bike_1 = require("../src/bike");
const user_1 = require("../src/user");
const location_1 = require("../src/location");
const bike_not_found_error_1 = require("../src/errors/bike-not-found-error");
const fake_user_repo_1 = require("./doubles/fake-user-repo");
const fake_bike_repo_1 = require("./doubles/fake-bike-repo");
const fake_rent_repo_1 = require("./doubles/fake-rent-repo");
const remove_user_rent_error_1 = require("../src/errors/remove-user-rent-error");
let userRepo;
let bikeRepo;
let rentRepo;
describe('App', () => {
    beforeEach(() => {
        userRepo = new fake_user_repo_1.FakeUserRepo();
        bikeRepo = new fake_bike_repo_1.FakeBikeRepo();
        rentRepo = new fake_rent_repo_1.FakeRentRepo();
    });
    it('should correctly calculate the rent amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App(userRepo, bikeRepo, rentRepo);
        const user = new user_1.User('Jose', 'jose@mail.com', '1234');
        yield app.registerUser(user);
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield app.registerBike(bike);
        const clock = sinon_1.default.useFakeTimers();
        yield app.rentBike(bike.id, user.email);
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour);
        const rentAmount = yield app.returnBike(bike.id, user.email);
        expect(rentAmount).toEqual(200.0);
    }));
    it('should be able to move a bike to a specific location', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App(userRepo, bikeRepo, rentRepo);
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield app.registerBike(bike);
        const newYork = new location_1.Location(40.753056, -73.983056);
        yield app.moveBikeTo(bike.id, newYork);
        expect(bike.location.latitude).toEqual(newYork.latitude);
        expect(bike.location.longitude).toEqual(newYork.longitude);
    }));
    it('should throw an exception when trying to move an unregistered bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App(userRepo, bikeRepo, rentRepo);
        const newYork = new location_1.Location(40.753056, -73.983056);
        yield expect(app.moveBikeTo('fake-id', newYork)).rejects.toThrow(bike_not_found_error_1.BikeNotFoundError);
    }));
    it('should correctly handle a bike rent', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App(userRepo, bikeRepo, rentRepo);
        const user = new user_1.User('Jose', 'jose@mail.com', '1234');
        yield app.registerUser(user);
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield app.registerBike(bike);
        yield app.rentBike(bike.id, user.email);
        const appRentRepo = (app.rentRepo);
        expect(appRentRepo.rents.length).toEqual(1);
        expect(appRentRepo.rents[0].bike.id).toEqual(bike.id);
        expect(appRentRepo.rents[0].user.email).toEqual(user.email);
        expect(bike.available).toBeFalsy();
    }));
    // it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     const user = new User('Jose', 'jose@mail.com', '1234')
    //     await app.registerUser(user)
    //     const bike = new Bike('caloi mountainbike', 'mountain bike',
    //         1234, 1234, 100.0, 'My bike', 5, [])
    //     await app.registerBike(bike)
    //     await app.rentBike(bike.id, user.email)
    //     await expect(app.rentBike(bike.id, user.email))
    //         .rejects.toThrow(UnavailableBikeError)
    // })
    // it('should throw user not found error when user is not found', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     await expect(app.findUser('fake@mail.com'))
    //         .rejects.toThrow(UserNotFoundError)
    // })
    // it('should correctly authenticate user', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     const user = new User('jose', 'jose@mail.com', '1234')
    //     await app.registerUser(user)
    //     await expect(app.authenticate('jose@mail.com', '1234'))
    //         .resolves.toBeTruthy()
    // })
    // it('should throw duplicate user error when trying to register a duplicate user', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     const user = new User('jose', 'jose@mail.com', '1234')
    //     await app.registerUser(user)
    //     await expect(app.registerUser(user)).rejects.toThrow(DuplicateUserError)
    // })
    // it('should correctly remove registered user', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     const user = new User('jose', 'jose@mail.com', '1234')
    //     await app.registerUser(user)
    //     await app.removeUser(user.email)
    //     await expect(app.findUser(user.email)).rejects.toThrow(UserNotFoundError)
    // })
    // it ('should throw user not found error when trying to remove an unregistered user', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     await expect(app.removeUser('fake@mail.com'))
    //         .rejects.toThrow(UserNotFoundError)
    // })
    // it ('should correctly register user', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     const user = new User('jose', 'jose@mail.com', '1234')
    //     await app.registerUser(user)
    //     await expect(app.findUser(user.email)).resolves.toEqual(user)
    // })
    // it('should throw rent is not found when trying to return', async () => {
    //     const app = new App(userRepo, bikeRepo, rentRepo)
    //     await expect(app.returnBike('false-id','false-email'))
    //         .rejects.toThrow(RentNotFoundError)
    // })
    it('should not remove user when they have a rented bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App(userRepo, bikeRepo, rentRepo);
        const user = new user_1.User('jose', 'jose@mail.com', '1234');
        yield userRepo.add(user);
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield bikeRepo.add(bike);
        yield app.rentBike(bike.id, user.email);
        yield expect(app.removeUser(user.email)).rejects.toBeInstanceOf(remove_user_rent_error_1.RemoveUserRentError);
    }));
});
