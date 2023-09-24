export class AlreadyRegisterUser extends Error{
    public readonly name = 'AlreadyRegisterUser'
    constructor(){
        super('Already Register User')
    }
}