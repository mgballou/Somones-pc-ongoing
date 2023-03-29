const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../controllers/pokemon')

router.post('/teams/:id/pokemon', pokemonCtrl.create)


module.exports = router