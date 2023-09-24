export class AlreadyRegisterBike extends Error{
    public readonly name = 'AlreadyRegisterBike'
    constructor(){
        super('Bike already exist')
    }
}