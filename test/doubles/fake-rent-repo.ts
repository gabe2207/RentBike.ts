import { RentRepo } from "../../src/ports/rent-repo";
import { Rent } from "../../src/rent";
import crypto from 'crypto'

export class FakeRentRepo implements RentRepo {
    rents: Rent[] = []

    async add(rent: Rent): Promise<string> {
        const id = Math.random().toString(36).substring(2, 15); // Gera um ID aleatório
        rent.id = id;
        this.rents.push(rent);
        console.log('Rent added to repo:', rent); // Log para verificação
        return id;
    }

    async findOpen(bikeId: string, userEmail: string): Promise<Rent> {
        return this.rents.find(rent =>
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            !rent.end
        )
    }

    async update(id: string, rent: Rent): Promise<void> {
        const rentIndex = this.rents.findIndex(rent => rent.id === id)
        if (rentIndex !== -1) this.rents[rentIndex] = rent
    }

    async findOpenRentsFor(email: string): Promise<Rent[]> {
        const openRents = this.rents.filter(rent => rent.email === email && !rent.end);
        return openRents;
    }
    
    
    
}