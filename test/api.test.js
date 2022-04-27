
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)


describe('Endpoint liveness test',() =>{
    test('Failed launches by launchpad endpoint ', async () =>{
        await api
        .get('/api/launchpads/5e9e4502f5090995de566f86')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)
    
    test('Starlink endpoint ', async () =>{
        await api
        .get('/api/starlink?month=04&year=2021')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)
})


describe('Starlink query combination',() =>{
    test('Starlink endpoint by year ', async () =>{
        await api
        .get('/api/starlink?year=2021')
        .expect(200)
    },100000)
    
    test('Starlink endpoint by month', async () =>{
        await api
        .get('/api/starlink?month=04')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)

    test('Starlink endpoint by date', async () =>{
        await api
        .get('/api/starlink?date=22')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)

    test('Starlink endpoint by date and month', async () =>{
        await api
        .get('/api/starlink?date=24&month=05')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)

    test('Starlink endpoint by date and year', async () =>{
        await api
        .get('/api/starlink?date=24&year2019')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)

    test('Starlink endpoint by month and year', async () =>{
        await api
        .get('/api/starlink?month=04&year=2020')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)

    test('Starlink endpoint by date, month and year', async () =>{
        await api
        .get('/api/starlink?date=22&month=04&year=2020')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    },100000)

    test('Non-existent satelite launch date', async () =>{
        await api.get('/api/starlink?date=18&month=04&year=2021')
        .expect(200)
        .expect((res) => {
            expect(res.body).toHaveProperty(
                "result", "No launches found on 2021-04-18"
            )
        })

    })
})


