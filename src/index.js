const DNA = ["ATGCAA", "AAGTGC", "ATATGT", "AGAAGG", "TCCCTA", "TCACTG"];
const numberLetters = 4;
const RIGTH = 'RTGTH';
const DOWN = 'DOWN';
const OBLIQUE_LEFT = 'OBLIQUE_LEFT';
const OBLIQUE_RIGTH = 'OBLIQUE_RIGTH';

var numberGenesMutants = 0;
var currentx = 0;
var currenty = 0;
var moveRigth = true;
var moveDown = true;
var moveObliqueRigth = true;
var moveObliqueLeft = true;
var isMutantReturn = false;

//Create a matrix of objects than contains the letter and its position in x and y.
function createMatrix(dna) {
    let matrix = [];
    dna.forEach((gen, x) => {
        var arreglo = gen.split('').map((gen, y) => { return { id: gen, x, y } })
        matrix[x] = arreglo;
    })
    return matrix;
}
var matrix = createMatrix(DNA);

function validationNextLetter(gen, nextGen, numberLetter, direction) {
    var validationDirection = direction === RIGTH ? moveRigth : direction === DOWN ? moveDown : direction === OBLIQUE_RIGTH ? moveObliqueRigth : moveObliqueLeft;
    var x= direction === RIGTH ? gen.x : direction === DOWN ? gen.x + 1 : direction === OBLIQUE_RIGTH ? gen.x + 1 : gen.x - 1;
    var y= direction === RIGTH ? gen.y + 1 : direction === DOWN ? gen.y : direction === OBLIQUE_RIGTH ? gen.y + 1 : gen.y + 1;
    if (gen.id === nextGen.id) {
        if (numberLetter === 2) {
            numberGenesMutants++;
            if (numberGenesMutants > 1) {
                return true;
            }
            direction === RIGTH ? moveRigth = false : direction === DOWN ? moveDown = false : direction === OBLIQUE_RIGTH ? moveObliqueRigth = false : moveObliqueLeft = false;
            return isMutant(currentx, currenty, numberLetters)
        }
        return isMutant(x, y, numberLetter - 1)
    }
    else if (validationDirection && gen.id !== nextGen.id) {
        direction === RIGTH ? moveRigth = false : direction === DOWN ? moveDown = false : direction === OBLIQUE_RIGTH ? moveObliqueRigth = false : moveObliqueLeft = false;
        return isMutant(currentx, currenty, numberLetters)
    }
}

function isMutant(x, y, numberLetter) {

    try {
        var gen = matrix[x][y];
        var genRigth = matrix[x][y + 1];
        var genDown = matrix[x + 1] ? matrix[x + 1][y] : undefined;
        var genObliqueRigth = matrix[x + 1] ? matrix[x + 1][y + 1] : undefined;
        var genObliqueLeft = matrix[x + 1] ? matrix[x + 1][y - 1] : undefined;

        //Validation Rigth
        if (gen.y + numberLetter <= matrix.length && moveRigth) {
            return validationNextLetter(gen, genRigth, numberLetter, RIGTH)
        } else {
            moveRigth = false;
        }
        //Validation down
        if (gen.x + numberLetter <= matrix.length && moveDown) {
            return validationNextLetter(gen, genDown, numberLetter, DOWN)
        } else {
            moveDown = false;
        }
        //Validation obliqueRigth
        if (gen.y + numberLetter <= matrix.length && gen.x + numberLetter <= matrix.length && moveObliqueRigth) {
            return validationNextLetter(gen, genObliqueRigth, numberLetter, OBLIQUE_RIGTH)
        } else {
            moveObliqueRigth = false;
        }
        //Validation obliqueLeft
        if (gen.y + numberLetter <= matrix.length && gen.x - numberLetter >= 0 && moveObliqueLeft) {
            return validationNextLetter(gen, genObliqueLeft, numberLetter, OBLIQUE_LEFT)
        } else {
            moveObliqueLeft = false;
        }

        if (currenty + 1 < matrix.length) {
            currenty++;
            moveRigth = true;
            moveDown = true;
            moveObliqueRigth = true;
            moveObliqueLefth = true;
            return isMutant(currentx, currenty, numberLetters)
        }
        else if (currentx + 1 < matrix.length) {
            currenty = 0;
            moveRigth = true;
            moveDown = true;
            moveObliqueRigth = true;
            moveObliqueLefth = true;
            currentx++;
            return isMutant(currentx, currenty, numberLetters)
        }
        else {
            return isMutantReturn;
        }
    }
    catch (e) {
        console.log(currentx)
        console.log(currenty)
        console.log(e)
    }

}


console.log(isMutant(currentx, currenty, numberLetters));

exports.mutant = async function (req, res) {
    res.send(false)
}




