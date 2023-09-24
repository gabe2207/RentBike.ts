import { Bike } from "./bike";
import { Crypt } from "./crypt";
import { AlreadyRegisterBike } from "./erros/AlreadyRegisterBike";
import { AlreadyRegisterUser } from "./erros/AlreadyRegisterUser";
import { RentnotFound } from "./erros/RentnotFound";
import { UnavailableBike } from "./erros/UnavailableBike";
import { UnregisteredBike } from "./erros/UnregisteredBike";
import { UserDoesNotExist } from "./erros/UserDoesNotExist";
import { UserNotFound } from "./erros/UserNotFound";
import { Location } from "./location";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: Crypt = new Crypt()

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    async registerUser(user: User): Promise<string> { //Test Done
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new AlreadyRegisterUser()
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        const encryptedPassword = await this.crypt.encrypt(user.password)
        user.password = encryptedPassword
        this.users.push(user)
        return newId
    }

    async authenticate(userEmail: string, password: string): Promise<boolean> {  
        const user = this.findUser(userEmail)
        if (!user) throw new UserNotFound()
        return await this.crypt.compare(password, user.password)
    }

    registerBike(bike: Bike): string { //Test Done
        const iBike = this.bikes.find(Ib => Ib === bike)
        if(iBike) throw new AlreadyRegisterBike()
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    
    }

    removeUser(email: string): void { //Test Done
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new UserDoesNotExist()
    }
    
    rentBike(bikeId: string | undefined, userEmail: string): void { //Test Done
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new UnregisteredBike()
        }
        if (!bike.available) {
            throw new UnavailableBike()
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new UserDoesNotExist()
        }
        bike.available = false
        const newRent = new Rent(bike, user, new Date())
        this.rents.push(newRent)
    }

    returnBike(bikeId: string | undefined, userEmail: string): number {  //test done
        const now = new Date()
        const rent = this.rents.find(rent =>
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            !rent.end
        )
        if (!rent) throw new RentnotFound()
        rent.end = now
        rent.bike.available = true
        const hours = diffHours(rent.end, rent.start)
        return hours * rent.bike.rate
    }

    listUsers(): User[] {
        return this.users
    }

    listBikes(): Bike[] {
        return this.bikes
    }

    listRents(): Rent[] {
        return this.rents
    }

    moveBikeTo(bikeId: string | undefined, location: Location): void { //test done
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if(!bike) throw new UnregisteredBike()
        bike.position.latitude = location.latitude
        bike.position.longitude = location.longitude
    }
}

function diffHours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
}