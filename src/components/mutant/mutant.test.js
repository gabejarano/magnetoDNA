const app = require('../../app');
const request = require('supertest');

describe('POST /mutant', () => {
    test('dna human, should respond whit a 403 status code', async () => {
        const response = await request(app).post('/api/mutant').send({
            dna: [
                'MTGCCA',
                'CAGTGC',
                'TTATGT',
                'AGAAGG',
                'CCCCTA',
                'TCACTG'
            ]
        });
        expect(response.statusCode).toBe(403)
    })

    test('dna mutant, should respond whit a 200 status code', async () => {
        const response = await request(app).post('/api/mutant').send({
            dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        });
        expect(response.statusCode).toBe(200)
    })
})

describe('GET /stats', () => {
    test('should respond whit a 200 status code', async () => {
        const response = await request(app).get('/api/stats');
        expect(response.statusCode).toBe(200)
    })
})





