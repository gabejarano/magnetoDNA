const Mutant = require('./mutant.model');
//Client dynamoDB
const dynamoclient = require('../../services/dynamodb');
const TABLE_NAME = "DNA_MUTANT";
const { uuid } = require('uuidv4');

// post mutant
exports.mutant = async function (req, res) {
    try{
        const { dna } = req.body;
        var mutant = new Mutant(uuid(), dna);
        var isMutant = mutant.isMutant(mutant.currentx, mutant.currenty, mutant.numberLetters);
        //Config item dynamoDB
        const params = {
            TableName: TABLE_NAME,
            Item: { dna: mutant.dna, mutant: isMutant, id: mutant.id },
        }
        await dynamoclient.put(params).promise();
        if(isMutant){
            res.status(200).json({
                message: 'Is Mutant!'
            })
        }else{
            res.status(403).json({
                message: 'Is Human!'
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

// get stats
exports.stats = async function (req,res){
    try{
        const params = {
            TableName: TABLE_NAME
        };
        const scan = await dynamoclient.scan(params).promise();
        var count = scan.Items.reduce((acc,curr)=>{
            if(curr.mutant){
                acc.countMutant++;
            }else{
                acc.countHuman++;
            }
            return acc;
        }, {countMutant:0, countHuman:0});
        res.status(200).json({count_mutant_dna:count.countMutant, count_human_dna:count.countHuman, ratio:count.countMutant/count.countHuman}) ;
    }catch(e){
        res.status(500).send(e);
    }
}




