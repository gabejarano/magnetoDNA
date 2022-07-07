const app = require('../../app');
const request = require('supertest');
const Mutant = require('../../components/mutant/mutant.model');

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

    test('dna mutant, should respond whit a 200 status code, oblique Left', async () => {
        const response = await request(app).post('/api/mutant').send({
            dna: ["ATGCGA","CAGTAC","TTAAGT","AGAAGG","ACCCTA","TCACTG"]
        });
        expect(response.statusCode).toBe(200)
    })

    test('dna mutant, should respond whit a 200 status code, down', async () => {
        const response = await request(app).post('/api/mutant').send({
            dna: ["ATGCGA","AAGTAC","ATAAGT","AGAAGG","ACCCTA","TCACTG"]
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

describe('Mutant model', () => {
    test('Matrix should be NxN', async () => {
        var dna= ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        id = 1;
        const mutant = new Mutant(id, dna)
        expect(mutant.matrix[0].length * mutant.matrix.length).toBe(36)
    })

    test('should be moveRigh equal false', async () => {
        var dna= ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        id = 1;
        const mutant = new Mutant(id, dna);
        mutant.validateMoves(mutant.RIGTH)
        expect(mutant.moveRigth).toBe(false)
    })

    test('should be moveDown equal false', async () => {
        var dna= ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        id = 1;
        const mutant = new Mutant(id, dna);
        mutant.validateMoves(mutant.DOWN)
        expect(mutant.moveDown).toBe(false)
    })

    test('should be moveBliqueRigth equal false', async () => {
        var dna= ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        id = 1;
        const mutant = new Mutant(id, dna);
        mutant.validateMoves(mutant.OBLIQUE_RIGTH)
        expect(mutant.moveObliqueRigth).toBe(false)
    })

    test('should be moveBliqueLeft equal false', async () => {
        var dna= ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        id = 1;
        const mutant = new Mutant(id, dna);
        mutant.validateMoves(mutant.OBLIQUE_LEFT)
        expect(mutant.moveObliqueLeft).toBe(false)
    })
})





