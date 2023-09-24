export class UnavailableBike extends Error{
    public readonly name = 'UnavailableBike'
    constructor(){
        super('Bike is not available')
    }
}