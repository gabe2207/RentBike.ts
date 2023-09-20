import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

describe('App', () => {
    it('should correctly calculate rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers()
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should track bike location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const location = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, location)
        expect(bike.position.latitude).toEqual(location.latitude)
        expect(bike.position.longitude).toEqual(location.longitude)
    })

    it('should raise exception when trying to move unregistered bike', () => {
        const app = new App();
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, []);
        const location = new Location(53.442, -55.000);
        app.moveBikeTo(bike.id, location);
        expect(() => app.moveBikeTo(bike.id, location)).toThrow('Bike not registered');

    })

    it('should raise exception when bike is already registered', () => {
        const app = new App();
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, []);
        app.registerBike(bike);
        expect(() => app.registerBike(bike)).toThrow('Bike already registered');
        
    })
})