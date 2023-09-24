export class UserNotFound extends Error{
    public readonly name = 'UserNotFound'
    constructor(){
        super('User not Found in our system')
    }
}