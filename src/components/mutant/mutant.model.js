

class Mutant {
    constructor(id, dna) {
        this.id = id;
        this.dna = dna;
        //if is true is mutant, if is false is human
        this.flag = false;
        //constants
        this.numberLetters = 4;
        this.RIGTH = 'RTGTH';
        this.DOWN = 'DOWN';
        this.OBLIQUE_LEFT = 'OBLIQUE_LEFT';
        this.OBLIQUE_RIGTH = 'OBLIQUE_RIGTH';
        //build matrix
        this.createMatrix(dna);
        //vars
        this.setVars();
        this.setMoves();
    }


    //Create a matrix of objects than contains the letter and its position in x and y.
    createMatrix(dna) {
        this.matrix = [];
        dna.forEach((gen, x) => {
            var arreglo = gen.split('').map((gen, y) => { return { id: gen, x, y } })
            this.matrix[x] = arreglo;
        })
        return this.matrix;
    }

    setMoves() {
        this.moveRigth = true;
        this.moveDown = true;
        this.moveObliqueRigth = true;
        this.moveObliqueLeft = true;
    }

    setVars() {
        this.currentx = 0;
        this.currenty = 0;
        this.numberGenesMutants = 0;
    }

    validateMoves(direction) {
        direction === this.RIGTH ? this.moveRigth = false : direction === this.DOWN ? this.moveDown = false : direction === this.OBLIQUE_RIGTH ? this.moveObliqueRigth = false : this.moveObliqueLeft = false;
    }

    validationNextLetter(gen, nextGen, numberLetter, direction) {
        var validationDirection = direction === this.RIGTH ? this.moveRigth : direction === this.DOWN ? this.moveDown : direction === this.OBLIQUE_RIGTH ? this.moveObliqueRigth : this.moveObliqueLeft;
        var x= direction === this.RIGTH ? gen.x : direction === this.DOWN ? gen.x + 1 : direction === this.OBLIQUE_RIGTH ? gen.x + 1 : gen.x + 1;
        var y= direction === this.RIGTH ? gen.y + 1 : direction === this.DOWN ? gen.y : direction === this.OBLIQUE_RIGTH ? gen.y + 1 : gen.y - 1;
        if (gen.id === nextGen.id) {
            if (numberLetter === 2) {
                this.numberGenesMutants++;
                if (this.numberGenesMutants > 1) {
                    this.flag=true;
                    return true;
                }
                this.validateMoves(direction);
                return this.isMutant(this.currentx, this.currenty, this.numberLetters)
            }
            return this.isMutant(x, y, numberLetter - 1)
        }
        else if (validationDirection && gen.id !== nextGen.id) {
            this.validateMoves(direction);
            return this.isMutant(this.currentx, this.currenty, this.numberLetters)
        }
    }


    isMutant(x, y, numberLetter) {

        try {
            var gen = this.matrix[x][y];
            var genRigth = this.matrix[x][y + 1];
            var genDown = this.matrix[x + 1] ? this.matrix[x + 1][y] : undefined;
            var genObliqueRigth = this.matrix[x + 1] ? this.matrix[x + 1][y + 1] : undefined;
            var genObliqueLeft = this.matrix[x + 1] ? this.matrix[x + 1][y - 1] : undefined;
    
            //Validation Rigth
            if (gen.y + numberLetter <= this.matrix.length && this.moveRigth) {
                return this.validationNextLetter(gen, genRigth, numberLetter, this.RIGTH)
            } else {
                this.moveRigth = false;
            }
            //Validation down
            if (gen.x + numberLetter <= this.matrix.length && this.moveDown) {
                return this.validationNextLetter(gen, genDown, numberLetter, this.DOWN)
            } else {
                this.moveDown = false;
            }
            //Validation obliqueRigth
            if (gen.y + numberLetter <= this.matrix.length && gen.x + numberLetter <= this.matrix.length && this.moveObliqueRigth) {
                return this.validationNextLetter(gen, genObliqueRigth, numberLetter, this.OBLIQUE_RIGTH)
            } else {
                this.moveObliqueRigth = false;
            }
            //Validation obliqueLeft
            if (gen.y - numberLetter >= 0 && gen.x + numberLetter <= this.matrix.length && this.moveObliqueLeft) {
                return this.validationNextLetter(gen, genObliqueLeft, numberLetter, this.OBLIQUE_LEFT)
            } else {
                this.moveObliqueLeft = false;
            }
    
            if (this.currenty + 1 < this.matrix.length) {
                this.currenty++;
                this.setMoves();
                return this.isMutant(this.currentx, this.currenty, this.numberLetters)
            }
            else if (this.currentx + 1 < this.matrix.length) {
                this.currenty = 0;
                this.currentx++;
                this.setMoves();
                return this.isMutant(this.currentx, this.currenty, this.numberLetters)
            }
            else {
                return false;
            }
        }
        catch (e) {
            return new Error(e);
        }
    
    }
}

module.exports = Mutant;