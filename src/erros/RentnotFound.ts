export class RentnotFound extends Error{
    public readonly name = 'RentnotFound'
    constructor(){
        super('Rent not found')
    }
}