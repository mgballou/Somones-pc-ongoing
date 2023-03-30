const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../controllers/pokemon')

router.post('/teams/:id/pokemon', pokemonCtrl.create)

router.delete('/pokemon/:id', pokemonCtrl.delete)

// router.get('/pokemon/:id', pokemonCtrl.edit))

router.put('/pokemon/:id', pokemonCtrl.update)

module.exports = router