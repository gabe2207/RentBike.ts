import { PrismaUserRepo } from "../../../src/external/database/prisma-user-repo";
import { User } from "../../../src/user";
import prisma from "../../../src/external/database/db"

describe ('PrismaUserRepo', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany
    })

    it('adds a user in the database', async () => {
        const userToBePersisted = new User(
            'test user',
            'test@gmail.com',
            '4567'
        )
        const repo = new PrismaUserRepo()
        const userId = await repo.add(userToBePersisted)
        expect(userId).toBeDefined()
        const persistedUser = await repo.find(userToBePersisted.email)
        expect(persistedUser.name).toEqual(userToBePersisted.name)

    })

    it('remove a user in the database', async() => {
        const user1 = new User('user1', 'user1@gmail.com', '4567')
        const repo = new PrismaUserRepo()
        await repo.add(user1)
        await repo.remove(user1.email)

        const userFromBD = await prisma.user.findUnique({
            where: {email: user1.email}
        })
        expect(userFromBD).toBeNull

    })
    it('finds a user in the database by email', async () => {
        const user = new User('find user', 'test-find@gmail.com', 'password123');
        const repo = new PrismaUserRepo()
        await repo.add(user);
        const foundUser = await repo.find(user.email);

        expect(foundUser).toBeDefined();
        expect(foundUser.email).toEqual(user.email);
    });

    it('lists user in the database', async () => {
        const user1 = new User('user1', 'user1@gmail.com', '4567')
        const user2 = new User('user2', 'user2@gmail.com', '4567')
        const repo = new PrismaUserRepo()
        await repo.add(user1)
        await repo.add(user2)
        const userList = await repo.list()
        expect(userList.length).toEqual(2)
    })
})