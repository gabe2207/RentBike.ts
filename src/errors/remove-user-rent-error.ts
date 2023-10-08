export class RemoveUserRentError extends Error {
    public readonly name = 'ImpossibletoRemove'

    constructor() {
        super('Impossible to Remove this user.')
    }
}