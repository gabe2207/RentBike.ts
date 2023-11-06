import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo";
import { Bike } from "../../../src/bike";
import prisma from "../../../src/external/database/db"

describe('PrismaBikeRepo', () => {
    beforeEach( async() => {
        await prisma.bike.deleteMany({})

    })
    afterAll( async() => {
        await prisma.bike.deleteMany
    })

    it('adds a bike in the database', async() => {
        const bikeToBePersisted = new Bike(
            'caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, []
        )
        const repo = new PrismaBikeRepo
        const bikeId = await repo.add(bikeToBePersisted)
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(bikeToBePersisted.id)
        expect(persistedBike.name).toEqual(bikeToBePersisted.name)
    })
    it('remove a bike in the database', async() => {
        const bike1 = new Bike('caloi mountainbike1', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.remove(bike1.id)

        const bikeFromBD = await prisma.bike.findUnique({
            where: {id: bike1.id}
        })
        expect(bikeFromBD).toBeNull

    })
    it('finds a bike in the database by id', async () => {
        const bike1 = new Bike('caloi mountainbike1', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        await repo.add(bike1);
        const foundBike = await repo.find(bike1.id);

        expect(foundBike).toBeDefined();
        expect(foundBike.id).toEqual(bike1.id);
    });
    it('lists bike in the database', async () => {
        const bike1 = new Bike('caloi mountainbike1', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const bike2 = new Bike('caloi mountainbike2', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.add(bike2)
        const userList = await repo.list()
        expect(userList.length).toEqual(2)
    })
    it('updates a bike in the database', async () => {
        const bikeToChange = new Bike('caloi mountainbike1', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToChange);

        // Verifique se a bicicleta foi persistida
        expect(bikeId).toBeDefined();
        let persistedBike = await repo.find(bikeId);

        // Verifique se a bicicleta recuperada tem as mesmas propriedades da original
        expect(persistedBike.name).toEqual(bikeToChange.name);

        // Defina os novos valores para atualizar
        const bikeUpdates = {
        name: 'caloi mountainbike1',
        type: 'racing',
        bodySize: 40,
        maxLoad: 20,
        rate: 100,
        description: 'racing bike ',
        ratings: 5,
        imageUrls: ['single-image.jpg'],
        available: false,
        location: {
            latitude: 123.456, 
            longitude: -123.456, 
          },
        id: '1234'
        };

        // Atualize a bicicleta no banco de dados
        await repo.update(bikeId, bikeUpdates);

        // Recupere a bicicleta atualizada do banco de dados
        persistedBike = await repo.find(bikeId);

        // Verifique se a bicicleta foi atualizada corretamente
        expect(persistedBike).toBeDefined();
        expect(persistedBike.id).toEqual(bikeUpdates.id);
        expect(persistedBike.type).toEqual(bikeUpdates.type);
    });
})