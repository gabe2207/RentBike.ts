import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    public end: Date = undefined
    dueDate: any;

    constructor(
        public bike: Bike,
        public user: User,
        public start: Date,
        public email: string,
        public id?: string
    
    ) {}
}

