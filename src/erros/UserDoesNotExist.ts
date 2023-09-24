export class UserDoesNotExist extends Error{
    public readonly name = 'UserDoesNotExist'
    constructor(){
        super('User Does Not Exist')
    }
}