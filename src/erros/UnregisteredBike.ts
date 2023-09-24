export class UnregisteredBike extends Error{
    public readonly name = 'UnregisteredBike'
    constructor(){
        super('Unregistered Bike')
    }
}