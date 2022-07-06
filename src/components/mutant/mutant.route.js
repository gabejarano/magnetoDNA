const {Router} = require('express');
const {mutant,stats} = require('./mutant.controller');

var router = Router();

router.post('/mutant',mutant)
router.get('/stats',stats)

module.exports = router;