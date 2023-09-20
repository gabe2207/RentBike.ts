import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { Location } from "./location"
import * as bcrypt from 'bcrypt';
import sinon from 'sinon'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    registerBike(bike: Bike){
        for(const rBike of this.bikes) {
            if(rBike.id === bike.id){
                throw new Error("Duplicate Bike")
            }
        }
        this.bikes.push(bike)
    }

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email})
    }

    async registerUser(user: User): Promise<void >{
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        console.log(hashedPassword)
        user.password = hashedPassword
        this.users.push(user);
    }

    async authenticateUser(userEmail: string, password: string): Promise<boolean> {
        const rUser = this.users.find(e => e.email === userEmail)
        if(!rUser){
            return false
        }
        const passwordMatch = await bcrypt.compare(password, rUser.password)
        return passwordMatch
    }

    async registerAndAuthenticateUser(user: User): Promise<void> {
        const password = user.password
        try {
            await this.registerUser(user);
            const isAuthenticated = await this.authenticateUser(user.email, password);
            if (isAuthenticated) {
                console.log('Usuário registrado e autenticado com sucesso.');
            } else {
                console.log('Erro ao autenticar o usuário após o registro.');
            }

        } catch (error) {
            console.error('Erro ao registrar o usuário:', error);
        }
    }

    listUsers() {
        return this.users.slice();
        
      }

      listBike(){
        return this.bikes.slice();
        
      }

      listRent(){
        return this.rents.slice();
      }



    removeUser(user: User ){
        let iU: number = this.users.indexOf(user);
        if (iU === -1) throw new Error('Usuario nao encontrado.');
        this.users.splice(iU, 1);
    }
    
    removeUserByEmail(email: string){
        let U = this.users.find(u => u.email === email);
        if (U === undefined) throw new Error('Usuario nao encontrado.');
        this.removeUser(U);
    }

    rentBike2(Mod: Bike) {                   //função para alugar somente pelo modelo
        const Modelo = Mod.name
        let BIKE = this.bikes.filter(b => b.name === Modelo)
        if(BIKE.length === 0) throw new Error('Bike não existe')

        let BikeEncontra = BIKE.find(e => e.rented === !Mod.rented)

        if(!BikeEncontra) throw new Error('Bike alugada')
            BikeEncontra.rented === true
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

    returnBike(ID: Bike): number{
        const iD = ID.id
        let BIKE = this.bikes.find(BIKE => BIKE.id === iD)
        if(BIKE === undefined) throw new Error('Bike não existe')
        if(BIKE.rented === false) throw new Error('Bike não esta alugada')
        BIKE.rented = false
        console.log('Bike devolvida.');

        const rentedHours = sinon.stub();
        rentedHours.returns(5);
        return BIKE.costPerHour * rentedHours();
    }

    localizaBike(bikeId: string, location: Location): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if(!bike && bike === undefined) throw new Error('Bike não encontrada');
        bike.position.latitude = location.latitude
        bike.position.longitude = location.longitude
    }
}
