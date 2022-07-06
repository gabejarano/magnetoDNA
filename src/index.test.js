const Mutant = require('./index');

describe('mutant', () => {
    

    test('should respond whit false', async () => {
        const dna = ["ATGCAA", "AAGTGC", "ATATGT", "AGAAGG", "TCCCTA", "TCACTG"];
        var mutant = new Mutant(dna);
        expect(mutant.isMutant(mutant.currenx, mutant.currenty, mutant.numberLetters)).toBe(true)
    })
})







